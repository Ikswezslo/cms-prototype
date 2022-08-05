package com.example.cms.pages;

import com.example.cms.pages.projections.PageWithChildren;
import com.example.cms.pages.projections.PageWithoutDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pages")
public class PageController {

    private final PageRepository repository;

    PageController(final PageRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/details")
    ResponseEntity<List<Page>> readAllPages() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping
    ResponseEntity<List<PageWithoutDetails>> readAllPagesWithoutDetails() {
        return ResponseEntity.ok(repository.findAll().stream().map(PageWithoutDetails::new).collect(Collectors.toList()));
    }

    @GetMapping("/{id}/details")
    ResponseEntity<Page> readPage(@PathVariable long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    ResponseEntity<PageWithChildren> readPageWithChildren(@PathVariable long id) {
        return repository.findById(id).map(parent -> {
            List<Page> children = repository.findAllByParent(parent);
            return ResponseEntity.ok(new PageWithChildren(parent, children));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    ResponseEntity<PageWithoutDetails> createPage(@RequestBody @Valid Page page) {
        Page result = repository.save(page);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new PageWithoutDetails(result));
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updatePage(@PathVariable long id, @RequestBody @Valid Page toUpdate) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.findById(id)
                .ifPresent(page -> {
                    page.updateFrom(toUpdate);
                    repository.save(page);
                });
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePage(@PathVariable long id) {
        Page page = repository.findById(id).orElse(null);

        if (page == null) {
            return ResponseEntity.notFound().build();
        }

        if (repository.existsByParent(page)) {
            return ResponseEntity.badRequest().build();
        }

        repository.delete(page);
        return ResponseEntity.noContent().build();
    }

}
