package com.example.cms.university;

import com.example.cms.university.projections.UniversityDtoDetailed;
import com.example.cms.university.projections.UniversityDtoForm;
import com.example.cms.university.projections.UniversityDtoSimple;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "universities")
public class UniversityController {
    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping
    public List<UniversityDtoSimple> getUniversities() {
        return universityService.getUniversities();
    }

    @GetMapping("/{id}")
    public UniversityDtoDetailed getUniversity(@PathVariable long id) {
        return universityService.getUniversity(id);
    }

    @PostMapping
    public ResponseEntity<UniversityDtoDetailed> registerNewUniversity(@RequestBody UniversityDtoForm form) {
        return universityService.addNewUniversity(form);
    }

    @PutMapping("/{universityId}/users/{userId}")
    public ResponseEntity<UniversityDtoDetailed> enrollUsersToUniversity(
            @PathVariable long universityId,
            @PathVariable long userId
    ) {
        return universityService.enrollUsersToUniversity(universityId, userId);
    }

    @PutMapping("/{universityId}/pages/{pageID}")
    public University connectMainPageToUniversity(
            @PathVariable Long universityId,
            @PathVariable Long pageID
    ){
        return universityService.connectMainPageToUniversity(universityId, pageID);
    }
    @PutMapping("/{id}/{un_hide}")
    public ResponseEntity<UniversityDtoSimple> hideOrUnhideUniversity(
            @PathVariable Long id,
            @PathVariable boolean un_hide){

        return universityService.setUn_Hide(id, un_hide);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUniversity(
            @PathVariable Long id
    ){
        return universityService.deleteUniversity(id);
    }
}
