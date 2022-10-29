package com.example.cms.page;

import com.example.cms.page.exceptions.PageException;
import com.example.cms.page.exceptions.PageExceptionType;
import com.example.cms.page.projections.PageDtoDetailed;
import com.example.cms.page.projections.PageDtoForm;
import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.security.LoggedUser;
import com.example.cms.security.SecurityService;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.data.domain.Pageable;
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

    public List<PageDtoSimple> getAll(Pageable pageable) {
        return pageRepository.findAll(pageable).stream()
                .map(PageDtoSimple::new)
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
                .map(PageDtoSimple::new)
                .collect(Collectors.toList());
    }

    public PageDtoDetailed get(Long id) {
        Optional<LoggedUser> optionalLoggedUser = securityService.getPrincipal();
        Set<Page> children;
        if (optionalLoggedUser.isEmpty()) {
            children = pageRepository.findChildren(id);
        } else {
            LoggedUser loggedUser = optionalLoggedUser.get();
            children = pageRepository.findChildren(
                    id,
                    String.valueOf(loggedUser.getAccountType()),
                    loggedUser.getUniversities(),
                    loggedUser.getId());
        }

        return pageRepository.findById(id).map(page -> new PageDtoDetailed(page, children))
                .orElseThrow(NotFoundException::new);
    }

    public PageDtoDetailed save(PageDtoForm form) {
        return new PageDtoDetailed(pageRepository.save(formToPage(form)), Set.of());
    }

    public void update(Long id, PageDtoForm form) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        page.updateFrom(formToPage(form));
        pageRepository.save(page);
    }

    public void delete(Long id) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);

        if (pageRepository.existsByParent(page)) {
            throw new PageException(PageExceptionType.DELETING_WITH_CHILD);
        }

        pageRepository.delete(page);
    }

    public void modifyHiddenField(Long id, boolean hidden) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        page.setHidden(hidden);
        pageRepository.save(page);
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

        User creator = userRepository.findById(form.getCreatorId())
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_USER);
                });

        page.setCreator(creator);

        return page;
    }

    public List<PageDtoSimple> getAllChildren(Long parentId) {
        Page parent = null;

        if (parentId != null) {
            parent = pageRepository.findById(parentId).orElseThrow(() -> {
                throw new PageException(PageExceptionType.NOT_FOUND_PARENT);
            });
        }

        return pageRepository.findByParent(parent).stream()
                .map(PageDtoSimple::new)
                .collect(Collectors.toList());
    }

    public void modifyContentField(Long id, String content) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        page.setContent(content);
        pageRepository.save(page);
    }

    public void editPage(Long id, PageDtoForm form) {
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        page.setTitle(form.getTitle());
        page.setDescription(form.getDescription());
        User creator = userRepository.findById(form.getCreatorId())
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_USER);
                });
        page.setCreator(creator);
        pageRepository.save(page);
    }

    public void modifyCreatorField(Long id, String username) {
        System.out.println("test");
        Page page = pageRepository.findById(id).orElseThrow(NotFoundException::new);
        User creator = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    throw new PageException(PageExceptionType.NOT_FOUND_USER);
                });
        page.setCreator(creator);
        pageRepository.save(page);
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
