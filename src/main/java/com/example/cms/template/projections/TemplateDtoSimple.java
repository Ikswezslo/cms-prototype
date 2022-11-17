package com.example.cms.template.projections;

import com.example.cms.template.Template;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemplateDtoSimple {
    private Long id;
    private String name;
    private String content;

    public static TemplateDtoSimple of(Template template) {
        if (template == null) {
            return null;
        }
        return new TemplateDtoSimple(template);
    }

    private TemplateDtoSimple(Template template) {
        id = template.getId();
        name = template.getName();
        content = template.getContent();
    }
}
