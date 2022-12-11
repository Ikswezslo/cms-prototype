package com.example.cms.file;

import com.example.cms.file.projections.FileDtoSimple;
import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
import com.example.cms.security.SecurityService;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.NotFoundException;
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
import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
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

        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);
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

        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
        }

        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

        deleteFileIfExists(page, multipartFile);

        FileResource fileResource = prepareFileResource(page, user, multipartFile);

        fileRepository.save(fileResource);
    }

    public List<FileDtoSimple> getAll(Long pageId) {
        List<Object[]> objects = fileRepository.findAllByPage(pageId);

        return prepareProjectionOutput(objects);
    }

    @Transactional
    @Secured("ROLE_USER")
    public void deleteFile(Long pageId, String filename) {
        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
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
        fileResource.setFileSize(humanReadableByteCountSI(multipartFile.getSize()));
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

    private static String humanReadableByteCountSI(long bytes) {
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
