package com.example.cms.security;

import com.example.cms.page.Page;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SecurityService {
    private final SessionRegistry sessionRegistry;

    public SecurityService(SessionRegistry sessionRegistry) {
        this.sessionRegistry = sessionRegistry;
    }

    public boolean hasRole(Role role) {
        LoggedUser principal = getPrincipal().orElseThrow(UnauthorizedException::new);
        String authority = String.format("ROLE_%s", role);
        return principal.getAuthorities().contains(new SimpleGrantedAuthority(authority));
    }

    public void checkRole(Role role) {
        if (!hasRole(role)) {
            throw new ForbiddenException();
        }
    }

    public boolean hasUniversity(Long id) {
        if (hasRole(Role.ADMIN)) {
            return true;
        }
        LoggedUser principal = getPrincipal().orElseThrow(UnauthorizedException::new);
        return principal.getUniversities().contains(id);
    }

    public void checkUniversity(Long id) {
        if (!hasUniversity(id)) {
            throw new ForbiddenException();
        }
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

    public boolean hasPermissionsToPage(Page page) {
        LoggedUser loggedUser = getPrincipal().orElseThrow(UnauthorizedException::new);
        if (loggedUser.getAccountType() == Role.USER || loggedUser.getAccountType() == Role.MODERATOR) {
            if (!loggedUser.getUniversities().contains(page.getUniversity().getId())) {
                return false;
            }
        }
        if (loggedUser.getAccountType() == Role.USER) {
            if (!page.getCreator().getId().equals(loggedUser.getId())) {
                return false;
            }
        }
        return true;
    }
}
