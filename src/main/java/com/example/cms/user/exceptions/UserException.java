package com.example.cms.user.exceptions;


import com.example.cms.validation.exceptions.BadRequestException;

public class UserException extends BadRequestException {

    public UserException(UserExceptionType type) {
        super(getMessage(type));
    }

    private static String getMessage(UserExceptionType type) {
        switch (type) {
            case NOT_FOUND_UNIVERSITY:
                return "University was not found";
            case USERNAME_TAKEN:
                return "Username already taken";
            case WRONG_PASSWORD:
                return "Password is wrong";
            case SAME_PASSWORD:
                return "New password cannot be the same";
            case NOT_VALID_PASSWORD:
                return "Password must be valid";
        }
        return "Unknown bad request";
    }
}
