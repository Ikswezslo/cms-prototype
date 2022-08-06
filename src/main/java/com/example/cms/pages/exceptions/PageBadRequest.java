package com.example.cms.pages.exceptions;


public class PageBadRequest extends RuntimeException{
    private final String error;

    public PageBadRequest(PageBadRequestType type) {
        error = getMessage(type);
    }

    public String getError() {
        return error;
    }
    private String getMessage(PageBadRequestType type) {
        switch (type){
            case NullParentId:
                return "Parent id must not be null";
            case NotFoundParentId:
                return "Parent id was not found";
            case DeletingPageWitchChild:
                return "Cannot delete page with at least one child";
        }
        return "Unknown bad request";
    }
}
