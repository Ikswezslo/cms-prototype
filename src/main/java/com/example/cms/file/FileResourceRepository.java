package com.example.cms.file;

import com.example.cms.page.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileResourceRepository extends JpaRepository<FileResource, Long> {
    FileResource findFileResourceByFilenameAndPage(String filename, Page page);

    @Query(value = "SELECT fileResource.filename, fileResource.file_type, fileResource.upload_date, fileResource.uploaded_by from files as fileResource", nativeQuery = true)
    List<Object[]> findAllByPage(Page page);
}
