package com.example.cms.user.exceptions;

import com.example.cms.validation.exceptions.ForbiddenException;

public class UserForbidden extends ForbiddenException {
    public UserForbidden() {
        super("ERRORS.USER.403");
    }
}
