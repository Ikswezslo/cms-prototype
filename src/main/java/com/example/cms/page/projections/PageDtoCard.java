package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoSimple;
import lombok.Value;

import java.time.format.DateTimeFormatter;

@Value
public class PageDtoCard {
    Long id;
    String title;
    UniversityDtoSimple university;
    String createdOn;
    String updatedOn;

    public PageDtoCard(Page page) {
        id = page.getId();
        title = page.getTitle();
        university = new UniversityDtoSimple(page.getUniversity());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        createdOn = page.getCreatedOn().toLocalDateTime().format(formatter);
        updatedOn = page.getUpdatedOn().toLocalDateTime().format(formatter);
    }
}
