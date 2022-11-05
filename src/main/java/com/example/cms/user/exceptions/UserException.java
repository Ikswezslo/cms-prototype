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
            case SAME_PASSWORD:
                return "The passwords are the same";
            case NOT_FOUND_UNIVERSITY:
                return "University is not found";
            case USERNAME_TAKEN:
                return "User with given username already exists";
            case WRONG_PASSWORD:
                return "The password is wrong";
            case NOT_VALID_PASSWORD:
                return "Password is not valid";
            case USER_IS_ENABLED:
                return "You cannot delete enabled users";
        }
        return "Unknown bad request";
    }
}
