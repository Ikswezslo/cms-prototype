package com.example.cms.backup;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/backups")
@RequiredArgsConstructor
public class BackupController {
    private final BackupService backupService;

    @GetMapping("/export/{backupName}")
    @Transactional
    public void exportDatabaseBackup(@PathVariable String backupName) throws SQLException, IOException {
        backupService.exportBackup(backupName);
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
}
