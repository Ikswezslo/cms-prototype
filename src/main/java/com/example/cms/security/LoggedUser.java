package com.example.cms.security;

import com.example.cms.university.University;
import com.example.cms.user.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class LoggedUser implements UserDetails {
    @Getter
    private final Long id;
    @Getter
    private final Role accountType;
    @Getter
    private final List<Long> universities;
    private final String username;
    private final String password;
    private final boolean enabled;

    public LoggedUser(User user) {
        id = user.getId();
        username = user.getUsername();
        password = user.getPassword();
        accountType = user.getAccountType();
        enabled = user.isEnabled();
        universities = user.getEnrolledUniversities().stream().map(University::getId).collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.addAll(createRoleAuthorities(accountType));
        authorities.addAll(universities.stream()
                .map((universityId -> new SimpleGrantedAuthority(String.format("UNIVERSITY_%d", universityId))))
                .collect(Collectors.toList())
        );
        return authorities;
    }

    private List<GrantedAuthority> createRoleAuthorities(Role role) {
        List<String> names = new ArrayList<>();

        String roleAdmin = "ROLE_ADMIN";
        String roleModerator = "ROLE_MODERATOR";
        String roleUser = "ROLE_USER";

        switch (role) {
            case ADMIN:
                names.addAll(List.of(roleAdmin, roleModerator, roleUser));
                break;
            case MODERATOR:
                names.addAll(List.of(roleModerator, roleUser));
                break;
            case USER:
                names.add(roleUser);
                break;
        }
        return names.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
