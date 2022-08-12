package com.example.cms.pages.exceptions;


import com.example.cms.validation.exceptions.BadRequestException;

public class PageException extends BadRequestException {

    public PageException(PageExceptionType type) {
        super(getMessage(type));
    }

    private static String getMessage(PageExceptionType type) {
        switch (type) {
            case NullParentId:
                return "Parent id must not be null";
            case NotFoundParentId:
                return "Parent id was not found";
            case DeletingPageWitchChild:
                return "Cannot delete page with at least one child";
            case IdEqualsParentId:
                return "Page id must be different than parent page id";
        }
        return "Unknown bad request";
    }
}
