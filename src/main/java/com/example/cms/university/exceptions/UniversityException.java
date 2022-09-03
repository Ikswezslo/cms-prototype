package com.example.cms.university.exceptions;

import com.example.cms.validation.exceptions.BadRequestException;

public class UniversityException extends BadRequestException {

    public UniversityException(UniversityExceptionType type) {
        super(getMessage(type));
    }
    private static String getMessage(UniversityExceptionType type) {
        switch (type) {
            case NAME_TAKEN:
                return "This name is already taken";
        }
        return "Unknown bad request";
    }
}
