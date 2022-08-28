package com.example.cms.page;

import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.security.LoggedUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages")
public class PageController {

    private final PageService service;

    PageController(final PageService service) {
        this.service = service;
    }

    @GetMapping
    List<PageDtoSimple> readAllPages(@AuthenticationPrincipal LoggedUser principal) {
        return service.getAll();
    }

    @GetMapping("/{id}")
    PageDtoDetailed readPage(@PathVariable long id) {
        return service.get(id);
    }

    @PostMapping
    ResponseEntity<PageDtoSimple> createPage(@RequestBody Page page) {
        return service.save(page);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updatePage(@PathVariable long id, @RequestBody Page page) {
        return service.update(id, page);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deletePage(@PathVariable long id) {
        return service.delete(id);
    }
}
