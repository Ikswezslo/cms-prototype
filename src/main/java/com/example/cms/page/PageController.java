package com.example.cms.page;

import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoForm;
import com.example.cms.page.projections.PageDtoSimple;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pages")
public class PageController {

    private final PageService service;

    PageController(final PageService service) {
        this.service = service;
    }

    @GetMapping("/all")
    List<PageDtoSimple> readAllPages(Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("/children")
    List<PageDtoSimple> readChildrenPages(@RequestParam(defaultValue = "") Long parent) {
        return service.getAllChildren(parent);
    }

    @GetMapping("/{id}")
    PageDtoDetailed readSinglePage(@PathVariable long id) {
        return service.get(id);
    }

    @GetMapping
    List<PageDtoSimple> readVisiblePages(Pageable pageable) {
        return service.getAllVisible(pageable);
    }

    @GetMapping("/creator/{userId}")
    List<PageDtoSimple> readCreatorPages(@PathVariable long userId, Pageable pageable) {
        return service.getCreatorPages(pageable, userId);
    }

    @PostMapping
    ResponseEntity<PageDtoDetailed> createPage(@RequestBody PageDtoForm form) {
        PageDtoDetailed result = service.save(form);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updatePage(@PathVariable long id, @RequestBody PageDtoForm form) {
        service.update(id, form);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/hidden")
    ResponseEntity<Void> modifyPageHiddenField(@PathVariable long id, @RequestBody boolean hidden) {
        service.modifyHiddenField(id, hidden);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/content")
    ResponseEntity<Void> modifyPageContentField(@PathVariable long id, @RequestBody String content) {
        service.modifyContentField(id, content);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deletePage(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/edit")
    ResponseEntity<Void> editPage(@PathVariable long id, @RequestBody PageDtoForm form) {
        service.editPage(id, form);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/creator")
    ResponseEntity<Void> modifyPageCreatorField(@PathVariable long id, @RequestBody String username) {
        service.modifyCreatorField(id, username);
        return ResponseEntity.noContent().build();
    }
}
