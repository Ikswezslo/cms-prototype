package com.example.cms.university;

import com.example.cms.university.projections.UniversityDtoDetailed;
import com.example.cms.university.projections.UniversityDtoFormCreate;
import com.example.cms.university.projections.UniversityDtoFormUpdate;
import com.example.cms.university.projections.UniversityDtoSimple;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(path = "universities")
public class UniversityController {
    private final UniversityService service;

    @GetMapping("/{id}")
    public UniversityDtoDetailed getUniversity(@PathVariable long id) {
        return service.getUniversity(id);
    }

    @GetMapping
    public List<UniversityDtoSimple> getUniversities() {
        return service.getUniversities();
    }

    @GetMapping("/search/{text}")
    List<UniversityDtoSimple> searchUniversities(Pageable pageable, @PathVariable String text) {
        return service.searchUniversities(pageable, "%".concat(text.toLowerCase().concat("%")));
    }

    @PostMapping
    public ResponseEntity<UniversityDtoDetailed> registerNewUniversity(@RequestBody UniversityDtoFormCreate form) {
        UniversityDtoDetailed result = service.addNewUniversity(form);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PutMapping("/{universityId}")
    UniversityDtoDetailed updateUniversity(
            @PathVariable long universityId,
            @RequestBody UniversityDtoFormUpdate form) {
        return service.update(universityId, form);
    }

    @PutMapping("/{universityId}/users/{userId}")
    public UniversityDtoDetailed enrollUsersToUniversity(
            @PathVariable long universityId,
            @PathVariable long userId) {
        return service.enrollUsersToUniversity(universityId, userId);
    }

    @PatchMapping("/{id}/hidden")
    public ResponseEntity<Void> modifyUniversityHiddenField(@PathVariable Long id,
                                                            @RequestBody boolean hidden) {
        service.modifyHiddenField(id, hidden);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUniversity(
            @PathVariable Long id) {
        service.deleteUniversity(id);
        return ResponseEntity.noContent().build();
    }
}
