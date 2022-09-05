package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoSimple;
import lombok.Value;

import java.time.LocalDateTime;
@Value
public class PageDtoCard {
    Long id;
    String title;
    UniversityDtoSimple university;
    LocalDateTime createdOn;
    LocalDateTime updatedOn;

    public PageDtoCard(Page page) {
        id = page.getId();
        title = page.getTitle();
        university = new UniversityDtoSimple(page.getUniversity());
        createdOn = page.getCreatedOn().toLocalDateTime();
        updatedOn = page.getUpdatedOn().toLocalDateTime();
    }
}
