package com.example.cms.page;

import com.example.cms.page.exceptions.PageException;
import com.example.cms.page.exceptions.PageExceptionType;
import com.example.cms.page.projections.*;
import com.example.cms.security.LoggedUser;
import com.example.cms.security.SecurityService;
import com.example.cms.university.University;
import com.example.cms.university.UniversityRepository;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.NotFoundException;
import com.example.cms.validation.exceptions.WrongDataStructureException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PageService {
    private final PageRepository pageRepository;
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;
    private final SecurityService securityService;

    public PageDtoDetailed get(Long id) {
        return pageRepository.findById(id).map(page -> {
            if (!isPageVisible(page)) {
                throw new ForbiddenException();
            }
            if (!isPageVisible(page.getParent())) {
                page.setParent(null);
            }
            // TODO: if university is hidden then page is hidden?
            return PageDtoDetailed.of(page, findVisibleSubpages(Sort.by("title"), page));
        }).orElseThrow(NotFoundException::new);
    }

    public List<PageDtoSimple> getAllVisible(Pageable pageable) {
        Optional<LoggedUser> loggedUserOptional = securityService.getPrincipal();
        List<Page> pages;
        if (loggedUserOptional.isEmpty()) {
            pages = pageRepository.findVisible(pageable);
        } else {
            LoggedUser loggedUser = loggedUserOptional.get();
            pages = pageRepository.findVisible(
                    pageable,
                    String.valueOf(loggedUser.getAccountType()),
                    loggedUser.getUniversities(),
                    loggedUser.getId());
        }
        return pages.stream()
                .map(PageDtoSimple::of)
                .collect(Collectors.toList());
    }

    public List<PageDtoSimple> searchPages(Pageable pageable, String text) {
        Optional<LoggedUser> loggedUserOptional = securityService.getPrincipal();
        List<Page> pages;
        if (loggedUserOptional.isEmpty()) {
            pages = pageRepository.searchPages(pageable, text);
        } else {
            LoggedUser loggedUser = loggedUserOptional.get();
            pages = pageRepository.searchPages(
                    pageable, text,
                    String.valueOf(loggedUser.getAccountType()),
                    loggedUser.getUniversities(),
                    loggedUser.getId());
        }
        return pages.stream()
                .map(PageDtoSimple::of)
                .collect(Collectors.toList());
    }

    public List<PageDtoSimple> getCreatorPages(Pageable pageable, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> {
            throw new PageException(PageExceptionType.NOT_FOUND_USER);
        });

        return pageRepository.findByCreator(pageable, user).stream()
                .filter(this::isPageVisible)
                .map(PageDtoSimple::of)
                .collect(Collectors.toList());
    }

    public List<PageDtoSimple> getSubpagesByParentPage(Sort sort, Long parentId) {
        Page parent = Optional.ofNullable(parentId)
                .map(id -> pageRepository.findById(id).orElseThrow(NotFoundException::new))
                .orElse(null);

        return findVisibleSubpages(sort, parent).stream()
                .map(PageDtoSimple::of)
                .collect(Collectors.toList());
    }

    private List<Page> findVisibleSubpages(Sort sort, Page page) {
        return pageRepository.findAllByParent(sort, page).stream()
                .filter(this::isPageVisible)
                .collect(Collectors.toList());
    }

    private boolean isPageVisible(Page page) {
        return page != null && !(page.isHidden() && securityService.isForbiddenPage(page));
    }

    @Secured("ROLE_USER")
    public PageDtoDetailed save(PageDtoFormCreate form) {
        if (form.getParentId() == null) {
            throw new WrongDataStructureException();
        }

        Page parent = pageRepository.findById(form.getParentId())
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_PARENT);
                });
        if (parent.isHidden() && securityService.isForbiddenPage(parent)) {
            throw new ForbiddenException();
        }

        User creator = userRepository.findById(form.getCreatorId())
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_USER);
                });
        if (securityService.isForbiddenUser(creator)) {
            throw new ForbiddenException();
        }

        Page newPage = form.toPage(parent, creator);
        if (securityService.isForbiddenPage(newPage)) {
            throw new ForbiddenException();
        }

        return PageDtoDetailed.of(pageRepository.save(newPage));
    }

    @Secured("ROLE_USER")
    public void update(Long id, PageDtoFormUpdate form) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
        }

        form.updatePage(page);
        pageRepository.save(page);
    }

    @Secured("ROLE_USER")
    public void modifyHiddenField(Long id, boolean hidden) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
        }

        page.setHidden(hidden);
        pageRepository.save(page);
    }

    @Secured("ROLE_USER")
    public void modifyContentField(Long id, String content) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
        }

        page.getContent().setPageContent(Optional.ofNullable(content).orElse(""));
        pageRepository.save(page);
    }

    @Secured("ROLE_MODERATOR")
    public void modifyCreatorField(Long id, String username) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
        }

        User creator = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_USER);
                });
        if (securityService.isForbiddenUser(creator)) {
            throw new ForbiddenException();
        }

        page.setCreator(creator);
        pageRepository.save(page);
    }

    @Secured("ROLE_USER")
    public void delete(Long id) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenPage(page)) {
            throw new ForbiddenException();
        }

        if (pageRepository.existsByParent(page)) {
            throw new PageException(PageExceptionType.DELETING_WITH_CHILD);
        }

        pageRepository.delete(page);
    }

    public PageDtoHierarchy getHierarchy(long universityId) {
        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        return PageDtoHierarchy.of(university.getMainPage(), securityService);
    }
}
