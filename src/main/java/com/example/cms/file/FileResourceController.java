package com.example.cms.file;

import com.example.cms.file.projections.FileDtoSimple;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileResourceController {

    private final FileResourceService fileService;

    @GetMapping("/all/page/{pageId}")
    public List<FileDtoSimple> getAll(@PathVariable Long pageId) {
        return fileService.getAll(pageId);
    }

    @GetMapping("download/page/{pageId}/{filename}")
    public ResponseEntity<Resource> downloadFiles(@PathVariable("pageId") Long pageId, @PathVariable("filename") String filename) throws IOException {
        return fileService.downloadFiles(pageId, filename);
    }

    @PostMapping("upload/page/{pageId}/user/{userId}")
    public ResponseEntity<List<String>> uploadFiles(@PathVariable("pageId") Long pageId, @PathVariable("userId") Long userId, @RequestParam("files") List<MultipartFile> multipartFiles) throws IOException {
        List<String> filenames = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            filenames.add(file.getOriginalFilename());
            fileService.uploadFile(pageId, userId, file);
        }
        return ResponseEntity.ok().body(filenames);
    }
}
