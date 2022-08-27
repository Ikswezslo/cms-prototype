package com.example.cms.security;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        if (servletRequest instanceof HttpServletRequest && servletResponse instanceof HttpServletResponse) {
            HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
            httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
            httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
            httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type");
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
