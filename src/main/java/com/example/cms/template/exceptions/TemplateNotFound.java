package com.example.cms.template.exceptions;

import com.example.cms.validation.exceptions.NotFoundException;

public class TemplateNotFound extends NotFoundException {
    public TemplateNotFound() {
        super("ERRORS.TEMPLATE.404");
    }
}
