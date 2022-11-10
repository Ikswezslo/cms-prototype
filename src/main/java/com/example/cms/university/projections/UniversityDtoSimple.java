package com.example.cms.university.projections;

import com.example.cms.university.University;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UniversityDtoSimple implements Serializable {
    private Long id;
    private String name;
    private String shortName;
    private boolean hidden;

    public static UniversityDtoSimple of(University university) {
        if (university == null) {
            return null;
        }
        return new UniversityDtoSimple(university);
    }

    private UniversityDtoSimple(University university) {
        id = university.getId();
        name = university.getName();
        shortName = university.getShortName();
        hidden = university.isHidden();
    }
}
