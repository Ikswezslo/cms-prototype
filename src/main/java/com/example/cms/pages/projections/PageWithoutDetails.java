package com.example.cms.pages.projections;

import com.example.cms.pages.Page;
import lombok.Value;

@Value
public class PageWithoutDetails {
    Long id;
    Long parentID;
    String title;
    String creator;
    boolean hidden;

    public PageWithoutDetails(Page page) {
        id = page.getId();
        title = page.getTitle();
        creator = page.getCreator();
        hidden = page.isHidden();

        parentID = (page.getParent() == null) ? null :
                page.getParent().getId();

    }
}
