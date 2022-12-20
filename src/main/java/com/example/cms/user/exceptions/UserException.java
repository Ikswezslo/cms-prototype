package com.example.cms.user.exceptions;

import com.example.cms.validation.exceptions.BadRequestException;

public class UserException extends BadRequestException {

    public UserException(UserExceptionType type) {
        super(getMessage(type));
    }

    private static String getMessage(UserExceptionType type) {
        switch (type) {
            case PAGES_EXISTS:
                return "ERRORS.USER.400.PAGES_EXISTS";
            case SAME_PASSWORD:
                return "ERRORS.USER.400.SAME_PASSWORD";
            case USERNAME_TAKEN:
                return "ERRORS.USER.400.USERNAME_TAKEN";
            case WRONG_PASSWORD:
                return "ERRORS.USER.400.WRONG_PASSWORD";
            case NOT_VALID_PASSWORD:
                return "ERRORS.USER.400.NOT_VALID_PASSWORD";
            case USER_IS_ENABLED:
                return "ERRORS.USER.400.USER_ENABLED";
            default:
                return "ERRORS.400";
        }
    }
}
