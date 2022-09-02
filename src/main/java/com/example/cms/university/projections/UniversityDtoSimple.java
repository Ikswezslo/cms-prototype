package com.example.cms.university.projections;

import com.example.cms.university.University;
import lombok.Value;

import java.io.Serializable;

@Value
public class UniversityDtoSimple implements Serializable {
    Long id;
    String name;
    String shortName;
    boolean hidden;

    public UniversityDtoSimple(University university) {
        id = university.getId();
        name = university.getName();
        shortName = university.getShortName();
        hidden = university.isHidden();
    }
}
