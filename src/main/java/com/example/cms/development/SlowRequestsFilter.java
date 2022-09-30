package com.example.cms.development;

import lombok.SneakyThrows;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.ThreadLocalRandom;

@Component
@Profile("slow-requests")
public class SlowRequestsFilter implements Filter {

    @SneakyThrows
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) {
        if (servletRequest instanceof HttpServletRequest && servletResponse instanceof HttpServletResponse) {
            int sleepTime = ThreadLocalRandom.current().nextInt(2000, 5000);
            Thread.sleep(sleepTime);
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
