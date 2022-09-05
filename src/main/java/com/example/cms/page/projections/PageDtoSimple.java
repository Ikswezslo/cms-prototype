package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.Value;

import java.time.LocalDateTime;

@Value
public class PageDtoSimple {
    Long id;
    String title;
    String description;
    UserDtoSimple creator;
    boolean hidden;
    LocalDateTime createdOn;
    LocalDateTime updatedOn;

    public PageDtoSimple(Page page) {
        id = page.getId();
        title = page.getTitle();
        description = page.getDescription();
        creator = new UserDtoSimple(page.getCreator());
        hidden = page.isHidden();
        createdOn = page.getCreatedOn().toLocalDateTime();
        updatedOn = page.getUpdatedOn().toLocalDateTime();
    }
}
