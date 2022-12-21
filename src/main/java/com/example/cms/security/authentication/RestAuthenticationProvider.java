package com.example.cms.security.authentication;

import com.example.cms.security.LoggedUser;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class RestAuthenticationProvider implements AuthenticationProvider {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public RestAuthenticationProvider(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        User user = repository.findByUsername(username).orElse(null);
        if (user != null) {
            LoggedUser loggedUser = new LoggedUser(user);
            if (!loggedUser.isEnabled()) {
                throw new DisabledException("ERRORS.LOGIN.401.DISABLED");
            }
            if (passwordEncoder.matches(password, loggedUser.getPassword())) {
                return new UsernamePasswordAuthenticationToken(new LoggedUser(user), password,
                        loggedUser.getAuthorities());
            } else {
                throw new BadCredentialsException("ERRORS.LOGIN.401.WRONG_CREDENTIALS");
            }
        } else {
            throw new BadCredentialsException("ERRORS.LOGIN.401.WRONG_CREDENTIALS");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
