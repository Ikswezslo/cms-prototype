package com.example.cms.page.projections;

import com.example.cms.university.University;
import com.example.cms.page.Page;
import com.example.cms.user.User;
import lombok.Value;

import java.util.List;
import java.util.stream.Collectors;

@Value
public class PageDtoDetailed {
    Long id;
    PageDtoSimple parent;
    String title;
    User creator;
    University university;
    boolean hidden;
    String content;
    List<PageDtoSimple> children;

    public PageDtoDetailed(Page page) {
        id = page.getId();
        title = page.getTitle();
        creator = page.getCreator();
        hidden = page.isHidden();
        content = page.getContent();
        university = page.getUniversity();

        parent = (page.getParent() == null) ? null :
                new PageDtoSimple(page.getParent());

        this.children = page.getChildren().stream().map(PageDtoSimple::new).collect(Collectors.toList());
    }
}
