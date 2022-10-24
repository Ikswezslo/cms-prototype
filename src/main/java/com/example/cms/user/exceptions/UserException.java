package com.example.cms.user.exceptions;

import com.example.cms.validation.exceptions.BadRequestException;

public class UserException extends BadRequestException {

    public UserException(UserExceptionType type) {
        super(getMessage(type));
    }

    private static String getMessage(UserExceptionType type) {
        switch (type) {
            case PAGES_EXISTS:
                return "You cannot delete user if pages which he created exist";
        }
        return "Unknown bad request";
    }
}
