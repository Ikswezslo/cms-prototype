package com.example.cms.pages.exceptions;

import java.util.List;

public class PageNotValid extends RuntimeException{
    private final List<String> errors;
    public PageNotValid(List<String> errors) {
        this.errors = errors;
    }
    public List<String> getErrors() {
        return errors;
    }
}
