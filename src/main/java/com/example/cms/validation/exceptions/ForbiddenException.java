package com.example.cms.validation.exceptions;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super("ERRORS.403");
    }
    public ForbiddenException(String message) {
        super(message);
    }
}
