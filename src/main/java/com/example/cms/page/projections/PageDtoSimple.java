package com.example.cms.page.projections;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDtoSimple {
    private Long id;
    private String title;
    private String description;
    private UserDtoSimple creator;
    private UniversityDtoSimple university;
    private boolean hidden;
    private String createdOn;
    private String updatedOn;
    private String keyWords;

    public static PageDtoSimple of(Page page) {
        if (page == null) {
            return null;
        }
        return new PageDtoSimple(page);
    }

    private PageDtoSimple(Page page) {
        id = page.getId();
        title = page.getTitle();
        description = page.getDescription();
        creator = UserDtoSimple.of(page.getCreator());
        university = UniversityDtoSimple.of(page.getUniversity());
        hidden = page.isHidden();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        createdOn = page.getCreatedOn().toLocalDateTime().format(formatter);
        updatedOn = page.getUpdatedOn().toLocalDateTime().format(formatter);
        keyWords = page.getKeyWords();
    }
}
