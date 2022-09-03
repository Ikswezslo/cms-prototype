package com.example.cms.page.exceptions;


import com.example.cms.validation.exceptions.BadRequestException;

public class PageException extends BadRequestException {

    public PageException(PageExceptionType type) {
        super(getMessage(type));
    }

    private static String getMessage(PageExceptionType type) {
        switch (type) {
            case NOT_FOUND_PARENT:
                return "Page parent was not found";
            case NOT_FOUND_USER:
                return "User was not found";
            case DELETING_WITH_CHILD:
                return "Cannot delete page with at least one child";
            case PARENT_IS_NULL:
                return "Page parent must not be null";
        }
        return "Unknown bad request";
    }
}
