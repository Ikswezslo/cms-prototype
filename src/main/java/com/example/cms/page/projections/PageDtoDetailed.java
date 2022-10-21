package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDtoDetailed {
    private Long id;
    private PageDtoSimple parent;
    private String title;
    private String description;
    private UserDtoSimple creator;
    private UniversityDtoSimple university;
    private boolean hidden;
    private String content;
    private Set<PageDtoSimple> children;
    private String createdOn;
    private String updatedOn;

    public static PageDtoDetailed of(Page page) {
        return of(page, Set.of());
    }

    public static PageDtoDetailed of(Page page, Set<Page> children) {
        if (page == null) {
            return null;
        }
        return new PageDtoDetailed(page, children);
    }

    private PageDtoDetailed(Page page, Set<Page> children) {
        id = page.getId();
        title = page.getTitle();
        description = page.getDescription();
        creator = UserDtoSimple.of(page.getCreator());
        hidden = page.isHidden();
        content = page.getContent();
        university = UniversityDtoSimple.of(page.getUniversity());
        parent = PageDtoSimple.of(page.getParent());

        this.children = children.stream().map(PageDtoSimple::of).collect(Collectors.toSet());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        createdOn = page.getCreatedOn().toLocalDateTime().format(formatter);
        updatedOn = page.getUpdatedOn().toLocalDateTime().format(formatter);
    }
}
