package com.example.cms.university.exceptions;

import com.example.cms.validation.exceptions.NotFoundException;

public class UniversityNotFound extends NotFoundException {
    public UniversityNotFound() {
        super("ERRORS.UNIVERSITY.404");
    }
}
