package com.example.cms.university.projections;

import com.example.cms.page.Content;
import com.example.cms.page.Page;
import com.example.cms.university.University;
import com.example.cms.user.User;
import lombok.Value;

@Value
public class UniversityDtoFormCreate {
    String name;
    String shortName;
    String description;
    Long creatorId;

    public University toUniversity(User creator, String content) {
        University university = new University();
        university.setName(name);
        university.setShortName(shortName);
        university.setDescription(description);
        university.setHidden(true);

        Page page = new Page();
        page.setTitle(university.getName());
        page.setDescription("Short description about university.");
        page.setContent(Content.of(content));
        page.setHidden(true);
        page.setUniversity(university);
        page.setCreator(creator);

        university.setMainPage(page);
        return university;
    }
}
