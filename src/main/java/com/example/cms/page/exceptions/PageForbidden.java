package com.example.cms.page.exceptions;

import com.example.cms.validation.exceptions.ForbiddenException;

public class PageForbidden extends ForbiddenException {
    public PageForbidden() {
        super("ERRORS.PAGE.403");
    }
}
