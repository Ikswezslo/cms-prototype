package com.example.cms.page;

import com.example.cms.page.exceptions.PageException;
import com.example.cms.page.exceptions.PageExceptionType;
import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoForm;
import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.security.SecurityService;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PageService {
    private final PageRepository pageRepository;
    private final UserRepository userRepository;
    private final SecurityService securityService;

    public PageService(PageRepository repository,
                       UserRepository userRepository,
                       SecurityService securityService) {
        this.pageRepository = repository;
        this.userRepository = userRepository;
        this.securityService = securityService;
    }

    public List<PageDtoSimple> getAll() {
        return pageRepository.findAll().stream()
                .map(PageDtoSimple::new)
                .collect(Collectors.toList());
    }

    public PageDtoDetailed get(Long id) {
        return pageRepository.findById(id).map(PageDtoDetailed::new)
                .orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<PageDtoDetailed> save(PageDtoForm form) {
        Page result = pageRepository.save(formToPage(form));
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new PageDtoDetailed(result));
    }

    public ResponseEntity<Void> update(Long id, PageDtoForm form) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        page.updateFrom(formToPage(form));
        pageRepository.save(page);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Void> delete(Long id) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);

        if (pageRepository.existsByParent(page)) {
            throw new PageException(PageExceptionType.DELETING_WITH_CHILD);
        }

        pageRepository.delete(page);
        return ResponseEntity.noContent().build();
    }

    public Page formToPage(PageDtoForm form) {
        Page page = new Page();
        page.setTitle(form.getTitle());
        page.setDescription(form.getDescription());
        page.setContent(form.getContent());
        page.setHidden(true);

        if (form.getParentId() == null) {
            throw new PageException(PageExceptionType.PARENT_IS_NULL);
        }

        Page parent = pageRepository.findById(form.getParentId())
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_PARENT);
                });

        page.setParent(parent);
        page.setUniversity(parent.getUniversity());

        User creator = userRepository.findByUsername(form.getCreatorUsername())
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_USER);
                });

        page.setCreator(creator);

        return page;
    }
}
