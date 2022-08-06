package com.example.cms.pages;

import com.example.cms.pages.exceptions.PageBadRequest;
import com.example.cms.pages.exceptions.PageBadRequestType;
import com.example.cms.pages.exceptions.PageNotFound;
import com.example.cms.pages.exceptions.PageNotValid;
import com.example.cms.pages.projections.PageWithChildren;
import com.example.cms.pages.projections.PageWithoutDetails;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @GetMapping("/raw")
    List<Page> readAllPages() {
        return repository.findAll();
    }

    @GetMapping("/{id}/raw")
    Page readPage(@PathVariable long id) {
        return repository.findById(id)
                .orElseThrow(PageNotFound::new);
    }

    @GetMapping
    List<PageWithoutDetails> readAllPagesWithoutDetails() {
        return repository.findAll().stream()
                .map(PageWithoutDetails::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    PageWithChildren readPageWithChildren(@PathVariable long id) {
        return repository.findById(id).map(parent -> new PageWithChildren(parent, repository.findAllByParent(parent)))
                .orElseThrow(PageNotFound::new);
    }

    @Validated
    @PostMapping
    ResponseEntity<?> createPage(@RequestBody @Valid Page page, BindingResult bindingResult) {
        validate(page, bindingResult);
        Page result = repository.save(page);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new PageWithoutDetails(result));
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updatePage(@PathVariable long id, @RequestBody @Valid Page toUpdate,
                                 BindingResult bindingResult) {
        validate(toUpdate, bindingResult);

        repository.findById(id)
                .ifPresentOrElse(page -> {
                    page.updateFrom(toUpdate);
                    repository.save(page);
                }, PageNotFound::new);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deletePage(@PathVariable long id) {

        Page page = repository.findById(id).orElseThrow(PageNotFound::new);

        if (repository.existsByParent(page)) {
            throw new PageBadRequest(PageBadRequestType.DeletingPageWitchChild);
        }

        repository.delete(page);
        return ResponseEntity.noContent().build();
    }

    private void validate(Page page, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            var errors = bindingResult.getFieldErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());

            throw new PageNotValid(errors);
        }
        if (page.getParent() != null && page.getParent().getId() == null) {
            throw new PageBadRequest(PageBadRequestType.NullParentId);
        }
        if (!repository.existsById(page.getParent().getId())) {
            throw new PageBadRequest(PageBadRequestType.NotFoundParentId);
        }
    }

    @ExceptionHandler(PageNotFound.class)
    ResponseEntity<String> handlePageNotFound(PageNotFound e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(PageBadRequest.class)
    ResponseEntity<String> handlePageBadRequest(PageBadRequest e) {
        return ResponseEntity.badRequest().body(e.getError());
    }

    @ExceptionHandler(PageNotValid.class)
    ResponseEntity<List<String>> handlePageNotValid(PageNotValid e) {
        return ResponseEntity.badRequest().body(e.getErrors());
    }
}
