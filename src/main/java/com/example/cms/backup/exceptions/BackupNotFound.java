package com.example.cms.backup.exceptions;

import com.example.cms.validation.exceptions.NotFoundException;

public class BackupNotFound extends NotFoundException {
    public BackupNotFound() {
        super("ERRORS.BACKUP.404");
    }
}
