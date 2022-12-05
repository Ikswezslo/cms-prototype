package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.user.User;
import lombok.Value;

@Value
public class PageDtoFormCreate {
    String title;
    String description;
    String content;
    Long creatorId;
    Long parentId;
    String keyWords;

    public Page toPage(Page parent, User creator) {
        Page page = new Page();
        page.setTitle(title);
        page.setDescription(description);
        page.setContent(content);
        page.setHidden(true);
        page.setParent(parent);
        page.setUniversity(parent.getUniversity());
        page.setCreator(creator);
        page.setKeyWords(keyWords);
        return page;
    }
}
