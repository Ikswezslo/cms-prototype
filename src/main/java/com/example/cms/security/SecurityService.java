package com.example.cms.security;

import com.example.cms.page.Page;
import com.example.cms.university.University;
import com.example.cms.user.User;
import com.example.cms.validation.exceptions.UnauthorizedException;
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
public class SecurityService {
    private final SessionRegistry sessionRegistry;

    public SecurityService(SessionRegistry sessionRegistry) {
        this.sessionRegistry = sessionRegistry;
    }

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
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);
        if (loggedUser.getAccountType() == Role.USER || loggedUser.getAccountType() == Role.MODERATOR) {
            if (!loggedUser.getUniversities().contains(page.getUniversity().getId())) {
                return true;
            }
        }
        if (loggedUser.getAccountType() == Role.USER) {
            if (!page.getCreator().getId().equals(loggedUser.getId())) {
                return true;
            }
        }
        return false;
    }

    public boolean isForbiddenUniversity(University university) {
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);
        if (loggedUser.getAccountType() == Role.USER) {
            return true;
        } else if (loggedUser.getAccountType() == Role.MODERATOR) {
            if (!loggedUser.getUniversities().contains(university.getId())) {
                return true;
            }
        }
        return false;
    }

    public boolean isForbiddenUser(User user, boolean onlyDifferentUser) {
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);

        if (onlyDifferentUser) {
            if (loggedUser.getId().equals(user.getId())) {
                return true;
            }
        }

        if (loggedUser.getAccountType() == Role.USER) {
            if (!loggedUser.getId().equals(user.getId())) {
                return true;
            }
        } else if (loggedUser.getAccountType() == Role.MODERATOR) {
            if (user.getAccountType() != Role.USER) { // TODO: or: user.getAccountType() == Role.ADMIN
                return true;
            }

            boolean sameUniversity = false;
            for (long universityId : user.getEnrolledUniversities().stream().map(University::getId).collect(Collectors.toList())) {
                if (loggedUser.getUniversities().contains(universityId)) {
                    sameUniversity = true;
                    break;
                }
            }
            if (!sameUniversity) {
                return true;
            }
        }
        return false;
    }

    public boolean isForbiddenUser(User user) {
        return isForbiddenUser(user, false);
    }
}
