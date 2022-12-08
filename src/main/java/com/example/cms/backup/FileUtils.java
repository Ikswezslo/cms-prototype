package com.example.cms.backup;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
import java.util.List;
import java.util.zip.ZipEntry;

public class FileUtils {

    private FileUtils() {

    }
    public static File newFileFromZipEntry(File destinationDir, ZipEntry zipEntry) throws IOException {
        File destFile = new File(destinationDir, zipEntry.getName());

        String destDirPath = destinationDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
        }

        return destFile;
    }

    public static void deleteFiles(List<File> files) throws IOException {
        for (File file : files) {
            Files.delete(Path.of(file.getPath()));
        }
    }

    public static String humanReadableByteCountSI(long bytes) {
        if (-1024 < bytes && bytes < 1024) {
            return bytes + " B";
        }
        CharacterIterator ci = new StringCharacterIterator("kMGTPE");
        while (bytes <= -999_950 || bytes >= 999_950) {
            bytes /= 1024;
            ci.next();
        }
        return String.format("%.1f %cB", bytes / 1024.0, ci.current());
    }
}
