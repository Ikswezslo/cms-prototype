package com.example.cms.file;

import com.example.cms.page.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileResourceRepository extends JpaRepository<FileResource, Long> {
    FileResource findFileResourceByFilenameAndPage(String filename, Page page);
}