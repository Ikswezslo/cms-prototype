package com.example.cms.pages.projections;

import com.example.cms.pages.Page;
import lombok.Value;

@Value
public class PageDtoSimple {
    Long id;
    String title;
    Long creatorID;
    boolean hidden;

    public PageDtoSimple(Page page) {
        id = page.getId();
        title = page.getTitle();
        creatorID = page.getCreator().getId();
        hidden = page.isHidden();
    }
}
