package com.example.cms.security;

import com.example.cms.page.Page;
import com.example.cms.university.University;
import com.example.cms.user.User;
import com.example.cms.validation.exceptions.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class SecurityService {
    private final SessionRegistry sessionRegistry;

    public Optional<LoggedUser> getPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof LoggedUser) {
            return Optional.of((LoggedUser) principal);
        } else {
            return Optional.empty();
        }
    }

    public void invalidateUserSession(Long id) {
        List<Object> loggedUsers = sessionRegistry.getAllPrincipals();
        for (Object principal : loggedUsers) {
            if (principal instanceof LoggedUser) {
                final LoggedUser loggedUser = (LoggedUser) principal;
                if (loggedUser.getId().equals(id)) {
                    List<SessionInformation> sessionsInfo = sessionRegistry.getAllSessions(principal, false);
                    if (sessionsInfo != null) {
                        for (SessionInformation sessionInformation : sessionsInfo) {
                            sessionInformation.expireNow();
                            log.info(String.format("User %d: session invalidated", id));
                        }
                    }
                }
            }
        }
    }

    public boolean isForbiddenPage(Page page) {
        return getPrincipal().map(loggedUser -> {
            switch (loggedUser.getAccountType()) {
                case ADMIN:
                    return false;
                case MODERATOR:
                    return !hasUniversity(page.getUniversity().getId());
                case USER:
                    return !page.getCreator().getId().equals(loggedUser.getId()) ||
                            !hasUniversity(page.getUniversity().getId());
            }
            return true;
        }).orElse(true);
    }

    public boolean isForbiddenUniversity(University university) {
        return getPrincipal().map(loggedUser -> {
            switch (loggedUser.getAccountType()) {
                case ADMIN:
                    return false;
                case MODERATOR:
                    return !hasUniversity(university.getId());
                case USER:
                    return true;
            }
            return true;
        }).orElse(true);
    }

    public boolean isForbiddenUser(User user, boolean onlyDifferentUser) {
        return getPrincipal().map(loggedUser -> {
            if (onlyDifferentUser && loggedUser.getId().equals(user.getId())) {
                return true;
            } else {
                return isForbiddenUser(user);
            }
        }).orElse(true);
    }

    public boolean isForbiddenUser(User user) {
        return getPrincipal().map(loggedUser -> {
            switch (loggedUser.getAccountType()) {
                case ADMIN:
                    return false;
                case MODERATOR:
                    return !loggedUser.getId().equals(user.getId()) &&
                            (!hasHigherRoleThan(user.getAccountType()) ||
                                    !hasUniversity(user.getEnrolledUniversities().stream()
                                            .map(University::getId)
                                            .collect(Collectors.toList())));
                case USER:
                    return !loggedUser.getId().equals(user.getId());
            }
            return true;
        }).orElse(true);
    }

    public boolean hasUniversity(List<Long> universities) {
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);

        boolean sameUniversity = false;
        for (long universityId : universities) {
            if (loggedUser.getUniversities().contains(universityId)) {
                sameUniversity = true;
                break;
            }
        }
        return loggedUser.getAccountType().equals(Role.ADMIN) || sameUniversity;
    }

    public boolean hasUniversity(Long universityId) {
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);
        return loggedUser.getAccountType().equals(Role.ADMIN) || loggedUser.getUniversities().contains(universityId);
    }

    public boolean hasHigherRoleThan(Role userRole, Role role) {
        switch (role) {
            case ADMIN:
            case MODERATOR:
                return userRole.equals(Role.ADMIN);
            case USER:
                return userRole.equals(Role.ADMIN) || userRole.equals(Role.MODERATOR);
        }
        return false;
    }

    public boolean hasHigherRoleThan(Role role) {
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);
        return hasHigherRoleThan(loggedUser.getAccountType(), role);
    }
}
