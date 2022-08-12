package com.example.cms.pages;

import com.example.cms.pages.exceptions.PageException;
import com.example.cms.pages.exceptions.PageExceptionType;
import com.example.cms.pages.projections.PageWithChildren;
import com.example.cms.pages.projections.PageWithoutDetails;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin // TODO: needs to be changed later
@RestController
@RequestMapping("/pages")
public class PageController {

    private final PageRepository repository;

    PageController(final PageRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    List<PageWithoutDetails> readAllPages() {
        return repository.findAll().stream()
                .map(PageWithoutDetails::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    PageWithChildren readPage(@PathVariable long id) {
        return repository.findById(id).map(parent -> new PageWithChildren(parent, repository.findAllByParent(parent)))
                .orElseThrow(NotFoundException::new);
    }

    @PostMapping
    public ResponseEntity<?> createPage(@RequestBody Page page) {
        validate(page);
        Page result = repository.save(page);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new PageWithoutDetails(result));
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updatePage(@PathVariable long id, @RequestBody Page toUpdate) {
        validate(toUpdate);

        if (toUpdate.getParent() != null && id == toUpdate.getParent().getId()) {
            throw new PageException(PageExceptionType.IdEqualsParentId);
        }

        repository.findById(id)
                .ifPresentOrElse(page -> {
                    page.updateFrom(toUpdate);
                    repository.save(page);
                }, NotFoundException::new);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePage(@PathVariable long id) {

        Page page = repository.findById(id).orElseThrow(NotFoundException::new);

        if (repository.existsByParent(page)) {
            throw new PageException(PageExceptionType.DeletingPageWitchChild);
        }

        repository.delete(page);
        return ResponseEntity.noContent().build();
    }

    private void validate(Page page) {
        if (page.getParent() != null) {
            if (page.getParent().getId() == null) {
                throw new PageException(PageExceptionType.NullParentId);
            } else {
                if (!repository.existsById(page.getParent().getId())) {
                    throw new PageException(PageExceptionType.NotFoundParentId);
                }
            }
        }
    }
}
