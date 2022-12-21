package com.example.cms.university.exceptions;

import com.example.cms.validation.exceptions.ForbiddenException;

public class UniversityForbidden extends ForbiddenException {
    public UniversityForbidden() {
        super("ERRORS.UNIVERSITY.403");
    }
}
