package com.example.cms.validation.exceptions;

public class SessionExpiredException extends RuntimeException {
    public SessionExpiredException() {
        super("SessionExpiredException error");
    }
}
