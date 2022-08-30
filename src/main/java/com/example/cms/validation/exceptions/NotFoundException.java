package com.example.cms.validation.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException() {
        super("NotFoundException error");
    }
}
