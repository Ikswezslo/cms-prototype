package com.example.cms.security.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class RestAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    public RestAuthenticationFilter(AuthenticationManager authenticationManager,
                                    AuthenticationSuccessHandler authenticationSuccessHandler,
                                    AuthenticationFailureHandler authenticationFailureHandler,
                                    CompositeSessionAuthenticationStrategy sessionAuthenticationStrategy) {
        setAuthenticationManager(authenticationManager);
        setAuthenticationSuccessHandler(authenticationSuccessHandler);
        setAuthenticationFailureHandler(authenticationFailureHandler);
        setSessionAuthenticationStrategy(sessionAuthenticationStrategy);
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        LoginForm form;
        try {
            form = new ObjectMapper().readValue(request.getInputStream(), LoginForm.class);
        } catch (IOException e) {
            throw new AuthenticationServiceException(e.getMessage(), e);
        }

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                form.getUsername(), form.getPassword());

        return this.getAuthenticationManager().authenticate(authRequest);
    }

}
