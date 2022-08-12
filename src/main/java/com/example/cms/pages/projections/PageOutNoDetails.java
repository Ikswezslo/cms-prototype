package com.example.cms.pages.projections;

import com.example.cms.pages.Page;
import com.example.cms.user.User;
import lombok.Value;

@Value
public class PageOutNoDetails {
    Long id;
    Long parentID;
    String title;
    Long creatorID;
    boolean hidden;

    public PageOutNoDetails(Page page) {
        id = page.getId();
        title = page.getTitle();
        creatorID = page.getCreator().getId();
        hidden = page.isHidden();

        parentID = (page.getParent() == null) ? null :
                page.getParent().getId();

    }
}
