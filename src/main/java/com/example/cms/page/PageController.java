package com.example.cms.page;

import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoForm;
import com.example.cms.page.projections.PageDtoSimple;
import org.springframework.http.ResponseEntity;
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
    List<PageDtoSimple> readAllPages() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    PageDtoDetailed readPage(@PathVariable long id) {
        return service.get(id);
    }

    @PostMapping
    ResponseEntity<PageDtoDetailed> createPage(@RequestBody PageDtoForm form) {
        return service.save(form);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updatePage(@PathVariable long id, @RequestBody PageDtoForm form) {
        return service.update(id, form);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deletePage(@PathVariable long id) {
        return service.delete(id);
    }
}
