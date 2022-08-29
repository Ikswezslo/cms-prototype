package com.example.cms.security;

import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SecurityService {
    public boolean hasRole(Role role) {
        LoggedUser principal = getPrincipal();
        String authority = String.format("ROLE_%s", role);
        return principal.getAuthorities().contains(new SimpleGrantedAuthority(authority));
    }

    public void checkRole(Role role) {
        if (!hasRole(role)) {
            throw new ForbiddenException();
        }
    }

    public boolean hasUniversity(Long id) {
        if(hasRole(Role.ADMIN)) {
            return true;
        }
        LoggedUser principal = getPrincipal();
        String authority = String.format("UNIVERSITY_%s", id);
        return principal.getAuthorities().contains(new SimpleGrantedAuthority(authority));
    }

    public void checkUniversity(Long id) {
        if (!hasUniversity(id)) {
            throw new ForbiddenException();
        }
    }

    public LoggedUser getPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof LoggedUser) {
            return (LoggedUser) principal;
        } else {
            log.warn("Wrong principal object type");
            throw new UnauthorizedException();
        }
    }
}
