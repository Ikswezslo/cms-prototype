package com.example.cms.university.exceptions;

import com.example.cms.validation.exceptions.BadRequestException;

public class UniversityException extends BadRequestException {

    public UniversityException(UniversityExceptionType type) {
        super(getMessage(type));
    }
    private static String getMessage(UniversityExceptionType type) {
        switch (type) {
            case NAME_TAKEN:
                return "ERRORS.UNIVERSITY.400.NAME_TAKEN";
            case UNIVERSITY_IS_NOT_HIDDEN:
                return "ERRORS.UNIVERSITY.400.UNIVERSITY_NOT_HIDDEN";
            case ACTIVE_USER_EXISTS:
                return "ERRORS.UNIVERSITY.400.ACTIVE_USER_EXISTS";
            default:
                return "ERRORS.400";
        }
    }
}
