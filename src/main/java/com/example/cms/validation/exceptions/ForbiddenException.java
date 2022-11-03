package com.example.cms.validation.exceptions;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super("ForbiddenException error");
    }

    public ForbiddenException(Class<?> c) {
        super(c.getSimpleName());
    }
}
