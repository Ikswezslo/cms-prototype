package com.example.cms.backup;

import com.example.cms.file.FileUtils;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Path;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

@Service
public class ZipService {
    public void zipArchive(List<File> files, Path zipPath) throws IOException {
        try(ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipPath.toFile()))) {
            for (File file : files) {
                zipSingleFile(file, zipOut);
            }
        }
    }
    private void zipSingleFile(File file, ZipOutputStream zipOut) throws IOException {
        try(FileInputStream fis = new FileInputStream(file)) {
            ZipEntry zipEntry = new ZipEntry(file.getName());
            zipOut.putNextEntry(zipEntry);

            byte[] bytes = new byte[1024];
            int length;
            while((length = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
        }
    }

    public void unzipArchive(Path zipPath) throws IOException {
        File destDir = zipPath.getParent().toFile();

        try (ZipInputStream zis = new ZipInputStream(new FileInputStream(zipPath.toFile()))) {
            ZipEntry zipEntry = zis.getNextEntry();
            while (zipEntry != null) {
                unzipSingleFile(FileUtils.newFileFromZipEntry(destDir, zipEntry), zis);
                zipEntry = zis.getNextEntry();
            }
            zis.closeEntry();
        }
    }

    private void unzipSingleFile(File file, ZipInputStream zis) throws IOException {
        byte[] buffer = new byte[1024];
        try (FileOutputStream fos = new FileOutputStream(file)) {
            int len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
        }
    }
}
