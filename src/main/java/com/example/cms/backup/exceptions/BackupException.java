package com.example.cms.backup.exceptions;

import com.example.cms.validation.exceptions.BadRequestException;

public class BackupException extends BadRequestException {
    public BackupException() {
        super("ERRORS.BACKUP.400");
    }
}
