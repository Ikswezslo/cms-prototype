package com.example.cms.file.projections;

import com.example.cms.file.FileResource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDtoSimple {
    private String filename;

    private String fileType;

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
    }
}
