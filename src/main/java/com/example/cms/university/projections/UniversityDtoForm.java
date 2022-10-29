package com.example.cms.university.projections;

import lombok.Value;

@Value
public class UniversityDtoForm {
    String name;
    String shortName;
    String description;
    Long creatorId;
}
