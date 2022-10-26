package com.example.cms.university.projections;

import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.university.University;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.Value;

import java.util.Set;
import java.util.stream.Collectors;

@Value
public class UniversityDtoDetailed {
    Long id;
    String name;
    String shortName;
    String description;
    boolean hidden;
    PageDtoSimple mainPage;
    Set<UserDtoSimple> enrolledUsers;

    public UniversityDtoDetailed(University university) {
        id = university.getId();
        name = university.getName();
        shortName = university.getShortName();
        description = university.getDescription();
        hidden = university.isHidden();
        enrolledUsers = university.getEnrolledUsers().stream().map(UserDtoSimple::new).collect(Collectors.toSet());
        mainPage = new PageDtoSimple(university.getMainPage());
    }

}
