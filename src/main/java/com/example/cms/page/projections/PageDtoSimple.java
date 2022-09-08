package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.Value;

import java.time.format.DateTimeFormatter;

@Value
public class PageDtoSimple {
    Long id;
    String title;
    String description;
    UserDtoSimple creator;
    UniversityDtoSimple university;
    boolean hidden;
    String createdOn;
    String updatedOn;

    public PageDtoSimple(Page page) {
        id = page.getId();
        title = page.getTitle();
        description = page.getDescription();
        creator = new UserDtoSimple(page.getCreator());
        university = new UniversityDtoSimple(page.getUniversity());
        hidden = page.isHidden();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        createdOn = page.getCreatedOn().toLocalDateTime().format(formatter);
        updatedOn = page.getUpdatedOn().toLocalDateTime().format(formatter);
    }
}
