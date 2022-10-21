package com.example.cms.university.projections;

import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.university.University;
import com.example.cms.user.projections.UserDtoSimple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UniversityDtoDetailed {
    private Long id;
    private String name;
    private String shortName;
    private boolean hidden;
    private PageDtoSimple mainPage;
    private Set<UserDtoSimple> enrolledUsers; // TODO: remove?

    public static UniversityDtoDetailed of(University university) {
        if (university == null) {
            return null;
        }
        return new UniversityDtoDetailed(university);
    }

    private UniversityDtoDetailed(University university) {
        id = university.getId();
        name = university.getName();
        shortName = university.getShortName();
        hidden = university.isHidden();
        enrolledUsers = university.getEnrolledUsers().stream().map(UserDtoSimple::of).collect(Collectors.toSet());
        mainPage = PageDtoSimple.of(university.getMainPage());
    }
}
