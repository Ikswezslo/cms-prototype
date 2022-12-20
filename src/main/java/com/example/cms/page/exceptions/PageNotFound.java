package com.example.cms.page.exceptions;

import com.example.cms.validation.exceptions.NotFoundException;

public class PageNotFound extends NotFoundException {
    public PageNotFound() {
        super("ERRORS.PAGE.404");
    }
}
