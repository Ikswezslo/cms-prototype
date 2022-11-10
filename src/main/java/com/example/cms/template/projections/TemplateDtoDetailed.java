package com.example.cms.template.projections;

import com.example.cms.template.Template;
import com.example.cms.university.projections.UniversityDtoSimple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemplateDtoDetailed {
    private Long id;
    private String name;
    private String content;
    private Set<UniversityDtoSimple> universities;

    public static TemplateDtoDetailed of(Template template) {
        if (template == null) {
            return null;
        }
        return new TemplateDtoDetailed(template);
    }

    private TemplateDtoDetailed(Template template) {
        id = template.getId();
        name = template.getName();
        content = template.getContent();
        universities = template.getUniversities().stream()
                .map(UniversityDtoSimple::of)
                .collect(Collectors.toSet());
    }
}
