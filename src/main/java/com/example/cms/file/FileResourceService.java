package com.example.cms.file;

import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;

@Service
public class FileResourceService {
    private final FileResourceRepository fileRepository;
    private final UserRepository userRepository;
    private final PageRepository pageRepository;

    FileResourceService(FileResourceRepository fileRepository,
                        UserRepository userRepository,
                        PageRepository pageRepository) {
        this.fileRepository = fileRepository;
        this.pageRepository = pageRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<Resource> downloadFiles(Long pageId, String filename) {

        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);

        FileResource fileResource = fileRepository.findFileResourceByFilenameAndPage(filename, page);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", filename);
        httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;File-Name=\"" + fileResource.getFilename() + "\"");
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(fileResource.getFileType()))
                .headers(httpHeaders).body(new ByteArrayResource(fileResource.getData()));
    }

    public ResponseEntity<FileResource> uploadFile(Long pageId, Long userId, MultipartFile multipartFile) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);

        FileResource fileResource = new FileResource();
        fileResource.setUploadDate(Timestamp.from(Instant.now()));
        fileResource.setAuthor(user);
        fileResource.setPage(page);
        fileResource.setFilename(StringUtils.cleanPath(multipartFile.getOriginalFilename()));
        fileResource.setFileType(multipartFile.getContentType());
        fileResource.setData(multipartFile.getBytes());

        return ResponseEntity.ok().body(fileRepository.save(fileResource));
    }
}
