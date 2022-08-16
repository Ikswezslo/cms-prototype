package com.example.cms.pages;

import com.example.cms.pages.projections.PageDtoDetailed;
import com.example.cms.pages.projections.PageDtoSimple;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin // TODO: needs to be changed later
@RestController
@RequestMapping("/pages")
public class PageController {

    private final PageService service;

    PageController(final PageService service) {
        this.service = service;
    }

    @GetMapping
    List<PageDtoSimple> readAllPages() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    PageDtoDetailed readPage(@PathVariable long id) {
        return service.get(id);
    }

    @PostMapping
    ResponseEntity<?> createPage(@RequestBody Page page) {
        return service.save(page);
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updatePage(@PathVariable long id, @RequestBody Page page) {
        return service.update(id, page);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePage(@PathVariable long id) {
        return service.delete(id);
    }
}
