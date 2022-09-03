package com.example.cms.page.projections;

import lombok.Value;

@Value
public class PageDtoForm {
    String title;
    String description;
    String content;
    String creatorUsername;
    Long parentId;
}
