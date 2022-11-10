package com.example.cms.template;

import com.example.cms.template.projections.TemplateDtoDetailed;
import com.example.cms.template.projections.TemplateDtoSimple;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "templates")
public class TemplateController {
    private final TemplateService service;

    public TemplateController(TemplateService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    TemplateDtoDetailed readSingleTemplate(@PathVariable long id) {
        return service.get(id);
    }

    @GetMapping("/all")
    List<TemplateDtoDetailed> readAllTemplates() {
        return service.getAll();
    }

    @GetMapping
    List<TemplateDtoSimple> readAllTemplatesByUniversity(@RequestParam long universityID) {
        return service.getAllByUniversity(universityID);
    }

    @PostMapping
    ResponseEntity<TemplateDtoDetailed> createTemplate(@RequestBody String name) {
        TemplateDtoDetailed result = service.save(name);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PostMapping("/{templateID}/universities/{universityID}")
    TemplateDtoDetailed addUniversityToTemplate(@PathVariable long templateID,
                                                @PathVariable long universityID) {
        return service.addUniversity(templateID, universityID);
    }

    @DeleteMapping("/{templateID}/universities/{universityID}")
    ResponseEntity<Void> removeUniversityFromTemplate(@PathVariable long templateID,
                                                      @PathVariable long universityID) {
        service.removeUniversity(templateID, universityID);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/name")
    ResponseEntity<Void> modifyPageNameField(@PathVariable long id, @RequestBody String name) {
        service.modifyNameField(id, name);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/content")
    ResponseEntity<Void> modifyPageContentField(@PathVariable long id, @RequestBody String content) {
        service.modifyContentField(id, content);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deletePage(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
