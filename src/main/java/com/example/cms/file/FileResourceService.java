package com.example.cms.file;

import com.example.cms.file.projections.FileDtoSimple;
import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
import com.example.cms.page.exceptions.PageForbidden;
import com.example.cms.page.exceptions.PageNotFound;
import com.example.cms.security.SecurityService;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.user.exceptions.UserNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileResourceService {
    private final FileResourceRepository fileRepository;
    private final UserRepository userRepository;
    private final PageRepository pageRepository;
    private final SecurityService securityService;

    public ResponseEntity<Resource> downloadFiles(Long pageId, String filename) {
        Page page = pageRepository.findById(pageId).orElseThrow(PageNotFound::new);
        if ((page.isHidden() || page.getUniversity().isHidden()) && securityService.isForbiddenPage(page)) {
            throw new PageForbidden();
        }

        FileResource fileResource = new FileResource();

        Optional<FileResource> optionalFileResource = fileRepository.findFileResourceByFilenameAndPage(filename, page);
        if (optionalFileResource.isPresent()) {
            fileResource = optionalFileResource.get();
        }


        HttpHeaders httpHeaders = prepareHeaders(fileResource.getFilename(), fileResource.getFileType(), fileResource.getData().length);

        return ResponseEntity.ok().headers(httpHeaders).body(new ByteArrayResource(fileResource.getData()));
    }

    @Secured("ROLE_USER")
    public void uploadFile(Long pageId, Long userId, MultipartFile multipartFile) throws IOException {

        Page page = pageRepository.findById(pageId).orElseThrow(PageNotFound::new);
        if (securityService.isForbiddenPage(page)) {
            throw new PageForbidden();
        }

        User user = userRepository.findById(userId).orElseThrow(UserNotFound::new);

        deleteFileIfExists(page, multipartFile);

        FileResource fileResource = prepareFileResource(page, user, multipartFile);

        fileRepository.save(fileResource);
    }

    public List<FileDtoSimple> getAll(Long pageId) {
        Page page = pageRepository.findById(pageId).orElseThrow(PageNotFound::new);
        if ((page.isHidden() || page.getUniversity().isHidden()) && securityService.isForbiddenPage(page)) {
            throw new PageForbidden();
        }
        List<Object[]> objects = fileRepository.findAllByPage(pageId);

        return prepareProjectionOutput(objects);
    }

    @Transactional
    @Secured("ROLE_USER")
    public void deleteFile(Long pageId, String filename) {
        Page page = pageRepository.findById(pageId).orElseThrow(PageNotFound::new);
        if (securityService.isForbiddenPage(page)) {
            throw new PageForbidden();
        }
        fileRepository.deleteFileResourceByFilenameAndAndPage(filename, page);
    }

    @Transactional
    protected void deleteFileIfExists(Page page, MultipartFile multipartFile) {
        Optional<FileResource> optionalFileResource = fileRepository.findFileResourceByFilenameAndPage(multipartFile.getOriginalFilename(), page);

        optionalFileResource.ifPresent(fileRepository::delete);
    }

    private static HttpHeaders prepareHeaders(String filename, String fileType, Integer length) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("File-Name", filename);
        httpHeaders.setContentDisposition(ContentDisposition.parse("attachment; File-Name=\"" + filename + "\""));
        httpHeaders.setContentType(MediaType.parseMediaType(fileType));
        httpHeaders.setContentLength(length);
        return httpHeaders;
    }

    private static FileResource prepareFileResource(Page page, User user, MultipartFile multipartFile) throws IOException {
        FileResource fileResource = new FileResource();
        fileResource.setUploadDate(Timestamp.from(Instant.now()));
        fileResource.setUploadedBy(user.getUsername());
        fileResource.setPage(page);
        fileResource.setFilename(StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename())));
        fileResource.setFileSize(FileUtils.humanReadableByteCountSI(multipartFile.getSize()));
        fileResource.setFileType(multipartFile.getContentType());
        fileResource.setData(multipartFile.getBytes());

        return fileResource;
    }

    private static List<FileDtoSimple> prepareProjectionOutput(List<Object[]> objects) {
        List<FileDtoSimple> output = new ArrayList<>();
        for (Object[] object : objects) {
            output.add(new FileDtoSimple(object[0].toString(), object[1].toString(),
                    object[2].toString(), object[3].toString(), object[4].toString()));
        }
        return output;
    }

}
