package com.example.cms.validation;

import com.example.cms.security.LoggedUser;
import com.example.cms.validation.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final HttpServletRequest request;
    private final HttpServletResponse response;

    public GlobalExceptionHandler(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<RestErrorBody> handleNotFoundException(NotFoundException ex) {
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), HttpStatus.NOT_FOUND, ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody);
    }

    @ExceptionHandler(UnauthorizedException.class)
    ResponseEntity<RestErrorBody> handleUnauthorizedException(UnauthorizedException ex) {
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), HttpStatus.UNAUTHORIZED, ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
    }

    @ExceptionHandler(ForbiddenException.class)
    ResponseEntity<RestErrorBody> handleForbiddenException(ForbiddenException ex) {
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), HttpStatus.FORBIDDEN, ex);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorBody);
    }

    @ExceptionHandler(BadRequestException.class)
    ResponseEntity<RestErrorBody> handleBadRequestException(BadRequestException ex) {
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), HttpStatus.BAD_REQUEST, ex);
        return ResponseEntity.badRequest().body(errorBody);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    ResponseEntity<RestErrorBody> handleConstraintViolationException(ConstraintViolationException ex) {
        RestErrorBody errorBody = createRestError(request, "Entity validation failed", HttpStatus.BAD_REQUEST, ex);

        var violations = ex.getConstraintViolations().stream()
                .map(RestErrorBody.FieldViolation::new)
                .collect(Collectors.toList());

        errorBody.setFieldViolations(violations);
        return ResponseEntity.badRequest().body(errorBody);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<RestErrorBody> handleAuthenticationException(AuthenticationException ex) {
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), HttpStatus.UNAUTHORIZED, ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<RestErrorBody> handleAuthenticationException(AccessDeniedException ex) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof LoggedUser) {
            status = HttpStatus.FORBIDDEN;
        }
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), status, ex);
        return ResponseEntity.status(status).body(errorBody);
    }

    @ExceptionHandler(SessionExpiredException.class)
    public ResponseEntity<RestErrorBody> handleHttpSessionRequiredException(SessionExpiredException ex) {
        RestErrorBody errorBody = createRestError(request, ex.getMessage(), HttpStatus.UNAUTHORIZED, ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
    }

    public static RestErrorBody createRestError(HttpServletRequest request, String message, HttpStatus status,
                                                RuntimeException exception) {
        RestErrorBody errorBody = new RestErrorBody(message);

        errorBody.setStatus(String.valueOf(status.value()));
        errorBody.setError(status.getReasonPhrase());
        errorBody.setUrl(request.getRequestURL().toString());
        errorBody.setMethod(request.getMethod());
        errorBody.setException(exception.getClass().getSimpleName());
        errorBody.setFieldViolations(List.of());

        return errorBody;
    }
}
