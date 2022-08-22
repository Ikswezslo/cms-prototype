package com.example.cms.page.exceptions;


import com.example.cms.validation.exceptions.BadRequestException;

public class PageException extends BadRequestException {

    public PageException(PageExceptionType type) {
        super(getMessage(type));
    }

    private static String getMessage(PageExceptionType type) {
        switch (type) {
            case NOT_FOUND_PARENT:
                return "Parent was not found";
            case NOT_FOUND_UNIVERSITY:
                return "University was not found";
            case NOT_FOUND_USER:
                return "User was not found";
            case DELETING_WITH_CHILD:
                return "Cannot delete page with at least one child";
            case ID_SAME_AS_PARENT:
                return "Page id must be different than parent page id";
        }
        return "Unknown bad request";
    }
}
