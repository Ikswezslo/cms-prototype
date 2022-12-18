package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.security.SecurityService;
import lombok.Data;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
public class PageDtoHierarchy {
    private Long id;
    private String title;
    private List<PageDtoHierarchy> children;

    public static PageDtoHierarchy of(Page page, SecurityService securityService) {
        if (page == null) {
            return null;
        }
        return new PageDtoHierarchy(page, securityService);
    }

    private PageDtoHierarchy(Page page, SecurityService securityService) {
        id = page.getId();
        title = page.getTitle();
        children = page.getChildren().stream()
                .sorted((page1, page2) -> {
                    String title1 = Optional.ofNullable(page1).map(Page::getTitle).orElse("");
                    String title2 = Optional.ofNullable(page2).map(Page::getTitle).orElse("");
                    return title1.compareToIgnoreCase(title2);
                })
                .filter(Objects::nonNull)
                .map(child -> {
                    if (child.isHidden() && securityService.isForbiddenPage(child)) {
                        child.setId(null);
                        child.setTitle("Hidden");
                    }
                    return PageDtoHierarchy.of(child, securityService);
                })
                .collect(Collectors.toList());
    }
}
