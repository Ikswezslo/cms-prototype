package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Value
public class PageDtoDetailed {
    Long id;
    PageDtoSimple parent;
    String title;
    String description;
    UserDtoSimple creator;
    UniversityDtoSimple university;
    boolean hidden;
    String content;
    Set<PageDtoSimple> children;
    LocalDateTime createdOn;
    LocalDateTime updatedOn;

    public PageDtoDetailed(Page page) {
        id = page.getId();
        title = page.getTitle();
        description = page.getDescription();
        creator = new UserDtoSimple(page.getCreator());
        hidden = page.isHidden();
        content = page.getContent();
        university = new UniversityDtoSimple(page.getUniversity());

        parent = (page.getParent() == null) ? null :
                new PageDtoSimple(page.getParent());

        children = page.getChildren().stream().map(PageDtoSimple::new).collect(Collectors.toSet());

        createdOn = page.getCreatedOn().toLocalDateTime();
        updatedOn = page.getUpdatedOn().toLocalDateTime();
    }
}
