package com.example.cms.university.projections;

import com.example.cms.university.University;
import com.example.cms.user.User;
import lombok.Value;

import java.util.Set;

@Value
public class UniversityD {
    Long id;
    String name;
    String shortName;
    boolean hidden;

    Set<User> enrolledUsers;

    public UniversityD(University university) {
        this.id = university.getId();
        this.name = university.getName();
        this.shortName = university.getShortName();
        this.hidden = university.isHidden();
        this.enrolledUsers = university.getEnrolledUsers();
    }

}
