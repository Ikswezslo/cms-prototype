package com.example.cms.university.projections;

import com.example.cms.university.University;
import lombok.Value;

@Value
public class UniversityD {
    Long id;
    String name;
    String shortName;
    boolean hidden;

    public UniversityD(University university) {
        this.id = university.getId();
        this.name = university.getName();
        this.shortName = university.getShortName();
        this.hidden = university.isHidden();
    }

}
