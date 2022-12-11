package com.example.cms.backup;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/backups")
@RequiredArgsConstructor
public class BackupController {
    private final BackupService backupService;

    @GetMapping("/export")
    @Transactional
    public void exportDatabaseBackup() throws SQLException, IOException {
        backupService.exportBackup(String.valueOf(Timestamp.valueOf(LocalDateTime.now()).getTime()));
    }

    @GetMapping("/import/{backupName}")
    @Transactional
    public void importDatabaseBackup(@PathVariable String backupName) throws SQLException, IOException {
        backupService.importBackup(backupName);
    }

    @GetMapping()
    public List<BackupDto> getBackups() {
        return backupService.getBackups();
    }

    @GetMapping(value = "/download/{backupName}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public FileSystemResource downloadBackup(@PathVariable String backupName) {
        return backupService.getBackupFile(backupName);
    }
}
