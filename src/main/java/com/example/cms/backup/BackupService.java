package com.example.cms.backup;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BackupService {
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;
    private final ZipService zipService;

    private Connection getConnection() {
        return DataSourceUtils.getConnection(Optional.ofNullable(jdbcTemplate.getDataSource())
                .orElseThrow(() -> {
                    throw new BackupException("Can't get Connection object");
                }));
    }

    private CopyManager createCopyManager(Connection connection) throws SQLException {
        if (!connection.isWrapperFor(BaseConnection.class)) {
            throw new BackupException("Can't create CopyManager");
        }

        return new CopyManager(connection.unwrap(BaseConnection.class));
    }

    @Secured("ROLE_ADMIN")
    public void exportBackup(String backupName) throws SQLException, IOException {
        Connection connection = getConnection();
        CopyManager copyManager = createCopyManager(connection);

        Path backupPath = Paths.get(String.format("./backups/%s/", backupName));
        Files.createDirectories(backupPath);

        ResultSet tables = connection.getMetaData().getTables(null, "public",
                "%", new String[]{"TABLE"});
        List<File> files = new ArrayList<>();
        while (tables.next()) {
            String tableName = tables.getString("TABLE_NAME");
            File file = new File(String.format("%s/%s.txt", backupPath, tableName));
            files.add(file);
            writeTableToFile(file, tableName, copyManager);
        }

        zipService.zipArchive(files, Paths.get(String.format("%s/%s.zip", backupPath, backupName)));
        FileUtils.deleteFiles(files);
    }

    private void writeTableToFile(File file, String table, CopyManager copyManager) throws IOException, SQLException {
        try (var writer = new BufferedWriter(new FileWriter(file))) {
            copyManager.copyOut(String.format("COPY %s TO STDOUT", table), writer);
        }
    }

    @Secured("ROLE_ADMIN")
    public void importBackup(String backupName) throws IOException, SQLException {
        Path backupPath = Paths.get(String.format("./backups/%s/", backupName));
        File zipArchive = new File(String.format("%s/%s.zip", backupPath, backupName));
        zipService.unzipArchive(zipArchive.toPath());
        Files.delete(zipArchive.toPath());

        CopyManager copyManager = createCopyManager(getConnection());

        List<File> files = Arrays.stream(Optional.ofNullable(backupPath.toFile().listFiles()).orElseThrow(() -> {
            throw new BackupException("Can't get backup files");
        })).filter(File::isFile).collect(Collectors.toList());

        List<String> tableNames = files.stream()
                .map(file -> file.getName().substring(0, file.getName().lastIndexOf('.')))
                .collect(Collectors.toList());

        executeQueryOnTables(tableNames, "ALTER TABLE %s DISABLE TRIGGER ALL");
        executeQueryOnTables(tableNames, "DELETE FROM %s");

        for (int i = 0; i < files.size(); i++) {
            readTableFromFile(files.get(i).getPath(), tableNames.get(i), copyManager);
        }

        executeQueryOnTables(tableNames, "ALTER TABLE %s ENABLE TRIGGER ALL");

        FileUtils.deleteFiles(files);
        Files.delete(backupPath);
    }

    private void readTableFromFile(String path, String table, CopyManager copyManager) throws IOException, SQLException {
        try (var reader = new BufferedReader(new FileReader(path))) {
            copyManager.copyIn(String.format("COPY %s FROM STDIN", table), reader);
        }
    }

    private void executeQueryOnTables(List<String> tableNames, String query) {
        tableNames.forEach(tableName ->
                entityManager.createNativeQuery(String.format(query, tableName)).executeUpdate());
    }

    @Secured("ROLE_ADMIN")
    public List<BackupDto> getBackups() {
        Path backupPath = Paths.get("./backups");
        List<File> files = Arrays.stream(Optional.ofNullable(backupPath.toFile().listFiles()).orElseThrow(() -> {
            throw new BackupException("Can't get backup directories");
        })).filter(File::isDirectory).collect(Collectors.toList());

        return files.stream().map(file -> {
            File zipFile = new File(String.format("%s/%s/%s.zip", backupPath, file.getName(), file.getName()));
            return new BackupDto(file.getName(), FileUtils.humanReadableByteCountSI(zipFile.length()));
        }).collect(Collectors.toList());
    }
}
