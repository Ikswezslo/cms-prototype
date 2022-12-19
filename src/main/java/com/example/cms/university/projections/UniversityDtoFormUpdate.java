package com.example.cms.university.projections;

import com.example.cms.university.University;
import lombok.Value;

@Value
public class UniversityDtoFormUpdate {
    String name;
    String shortName;
    String description;

    public void updateUniversity(University university) {
        university.setName(name);
        university.setShortName(shortName);
        university.setDescription(description);
    }
}
