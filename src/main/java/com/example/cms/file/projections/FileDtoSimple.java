package com.example.cms.file.projections;

import com.example.cms.file.FileResource;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
public class FileDtoSimple {
    private String filename;

    private String fileType;

    private String fileSize;
    private String uploadDate;

    private String uploadedBy;


    public static FileDtoSimple of(FileResource fileResource) {
        if (fileResource == null) {
            return null;
        }
        return new FileDtoSimple(fileResource);
    }

    public FileDtoSimple(FileResource fileResource) {
        this.filename = fileResource.getFilename();
        this.fileType = fileResource.getFileType();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.uploadDate = fileResource.getUploadDate().toLocalDateTime().format(formatter);
        this.uploadedBy = fileResource.getUploadedBy();
        this.fileSize = fileResource.getFileSize();
    }

    public FileDtoSimple(String filename, String fileType, String fileSize, String uploadedDate, String uploadedBy) {
        this.filename = filename;
        this.fileType = fileType;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.uploadDate = Timestamp.valueOf(uploadedDate).toLocalDateTime().format(formatter);
        this.uploadedBy = uploadedBy;
        this.fileSize = fileSize;
    }
}
