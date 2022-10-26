package com.example.cms.page;

import com.example.cms.page.exceptions.PageException;
import com.example.cms.page.exceptions.PageExceptionType;
import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoFormCreate;
import com.example.cms.page.projections.PageDtoFormUpdate;
import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.security.LoggedUser;
import com.example.cms.security.SecurityService;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.NotFoundException;
import com.example.cms.validation.exceptions.WrongDataStructureException;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
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

    public PageDtoDetailed get(Long id) {
        return pageRepository.findById(id).map(page -> {
            if (page.isHidden() && securityService.isForbiddenPage(page)) {
                throw new ForbiddenException();
            }
            if (page.getParent() != null && page.getParent().isHidden() &&
                    securityService.isForbiddenPage(page.getParent())) {
                page.setParent(null);
            }
            // TODO: set user and university to null if not visible (same as parent)
            return PageDtoDetailed.of(page, findVisibleSubpages(id));
        }).orElseThrow(NotFoundException::new);
    }

    @Secured("ROLE_ADMIN") // TODO: remove PageService#getAll
    public List<PageDtoSimple> getAll(Pageable pageable) {
        return pageRepository.findAll(pageable).stream()
                .map(PageDtoSimple::of)
                .collect(Collectors.toList());
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

    public List<PageDtoSimple> getChildren(Long parentId) {
        return findVisibleSubpages(parentId).stream()
                .map(PageDtoSimple::of)
                .collect(Collectors.toList());
    }

    private Set<Page> findVisibleSubpages(Long parentId) {
        Optional<LoggedUser> optionalLoggedUser = securityService.getPrincipal();
        Set<Page> children;
        if (optionalLoggedUser.isEmpty()) {
            children = pageRepository.findChildren(parentId);
        } else {
            LoggedUser loggedUser = optionalLoggedUser.get();
            children = pageRepository.findChildren(
                    parentId,
                    String.valueOf(loggedUser.getAccountType()),
                    loggedUser.getUniversities(),
                    loggedUser.getId());
        }
        return children;
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

        User creator = userRepository.findByUsername(form.getCreatorUsername())
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

        page.setContent(content);
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

    public List<PageDtoSimple> getCreatorPages(Pageable pageable, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> {
            throw new PageException(PageExceptionType.NOT_FOUND_USER);
        });

        return pageRepository.findByCreator(pageable, user).stream()
                .map(PageDtoSimple::new)
                .collect(Collectors.toList());
    }
}
