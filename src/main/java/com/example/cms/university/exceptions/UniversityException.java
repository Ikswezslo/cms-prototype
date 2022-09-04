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
            case CONTENT_EXISTS:
                return "You cannot delete University with associated content";
            case UNIVERSITY_IS_NOT_HIDDEN:
                return "You cannot delete University which is not hidden";
            case ACTIVE_USER_EXISTS:
                return "You cannot delete University with active users";
        }
        return "Unknown bad request";
    }
}
