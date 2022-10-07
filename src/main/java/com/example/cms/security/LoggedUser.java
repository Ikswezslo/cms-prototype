package com.example.cms.security;

import com.example.cms.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class LoggedUser implements UserDetails {

    private transient User user;

    public LoggedUser(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.addAll(createRoleAuthorities(user.getAccountType()));
        authorities.addAll(user.getEnrolledUniversities().stream().map((
                        university -> new SimpleGrantedAuthority(String.format("UNIVERSITY_%d", university.getId()))))
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

    public void update(User user) {
        this.user = user;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
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
        return user.isEnabled();
    }
}
