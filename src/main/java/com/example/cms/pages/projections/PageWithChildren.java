package com.example.cms.pages.projections;

import com.example.cms.pages.Page;
import lombok.Value;

import java.util.List;
import java.util.stream.Collectors;

@Value
public class PageWithChildren {
    Long id;
    PageWithoutDetails parent;
    String title;
    String creator;
    String content;
    List<PageWithoutDetails> children;

    public PageWithChildren(Page page, List<Page> children) {
        id = page.getId();
        title = page.getTitle();
        creator = page.getCreator();
        content = page.getContent();

        parent = (page.getParent() == null) ? null :
                new PageWithoutDetails(page.getParent());

        this.children = children.stream()
                .map(PageWithoutDetails::new)
                .collect(Collectors.toList());
    }
}
