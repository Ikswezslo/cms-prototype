package com.example.cms.backup;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/export")
    public void exportDatabaseBackup() throws SQLException, IOException {
        backupService.exportBackup(String.valueOf(Timestamp.valueOf(LocalDateTime.now()).getTime()));
    }

    @GetMapping("/import/{backupName}")
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

    @DeleteMapping(value = "/delete/{backupName}")
    public void deleteBackup(@PathVariable String backupName) {
        backupService.deleteBackupFile(backupName);
    }
}
