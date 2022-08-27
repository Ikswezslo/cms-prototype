package com.example.cms.validation.exceptions;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("Full authentication is required to access this resource");
    }
}
