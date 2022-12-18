package com.example.cms.backup;

import com.example.cms.validation.exceptions.BadRequestException;

public class BackupException extends BadRequestException {
    public BackupException(String message) {
        super(message);
    }
}
