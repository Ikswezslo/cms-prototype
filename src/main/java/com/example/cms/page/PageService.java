package com.example.cms.page;

import com.example.cms.page.exceptions.PageException;
import com.example.cms.page.exceptions.PageExceptionType;
import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.security.SecurityService;
import com.example.cms.university.UniversityRepository;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PageService {
    private final PageRepository pageRepository;
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;
    private final SecurityService securityService;

    public PageService(PageRepository repository,
                       UniversityRepository universityRepository,
                       UserRepository userRepository, SecurityService securityService) {
        this.pageRepository = repository;
        this.universityRepository = universityRepository;
        this.userRepository = userRepository;
        this.securityService = securityService;
    }

    public List<PageDtoSimple> getAll() {
        return pageRepository.findAll().stream()
                .map(PageDtoSimple::new)
                .collect(Collectors.toList());
    }

    public PageDtoDetailed get(long id) {
        return pageRepository.findById(id).map(PageDtoDetailed::new)
                .orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<PageDtoSimple> save(Page toSave) {
        validate(toSave);
        Page result = pageRepository.save(toSave);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new PageDtoSimple(result));
    }

    public ResponseEntity<Void> update(long id, Page toUpdate) {
        validate(toUpdate);

        if (toUpdate.getParent() != null && id == toUpdate.getParent().getId()) {
            throw new PageException(PageExceptionType.ID_SAME_AS_PARENT);
        }
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        page.updateFrom(toUpdate);
        pageRepository.save(page);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Void> delete(long id) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);

        if (pageRepository.existsByParent(page)) {
            throw new PageException(PageExceptionType.DELETING_WITH_CHILD);
        }

        pageRepository.delete(page);
        return ResponseEntity.noContent().build();
    }

    private void validate(Page page) {
        Page parent = page.getParent();
        if (parent != null) {
            checkExisting(parent.getId(), pageRepository, PageExceptionType.NOT_FOUND_PARENT);
        }
        if (page.getUniversity() != null) {
            checkExisting(page.getUniversity().getId(), universityRepository, PageExceptionType.NOT_FOUND_UNIVERSITY);
        }
        if (page.getCreator() != null) {
            checkExisting(page.getCreator().getId(), userRepository, PageExceptionType.NOT_FOUND_USER);
        }
    }

    private <T> void checkExisting(Long id, JpaRepository<T, Long> repository, PageExceptionType exceptionType) {
        if (id == null) {
            throw new PageException(exceptionType);
        } else {
            if (!repository.existsById(id)) {
                throw new PageException(exceptionType);
            }
        }
    }
}
