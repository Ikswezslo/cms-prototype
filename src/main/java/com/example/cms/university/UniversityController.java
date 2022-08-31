package com.example.cms.university;

import com.example.cms.university.projections.UniversityD;
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
    public List<UniversityD> getUniversities() {
        return universityService.getUniversities();
    }

    @GetMapping("/{id}")
    public UniversityD getUniversity(@PathVariable long id) {
        return universityService.getUniversity(id);
    }

    @PostMapping
    public ResponseEntity<UniversityD> registerNewUniversity(@RequestBody University university) {return universityService.addNewUniversity(university);}

    @PutMapping("/{universityId}/users/{userId}")
    public ResponseEntity<UniversityD> enrollUsersToUniversity(
            @PathVariable Long universityId,
            @PathVariable Long userId
    ) {
        return universityService.enrollUsersToUniversity(universityId, userId);
    }

    @PutMapping("/{universityId}/pages/{pageID}")
    public ResponseEntity<UniversityD> connectMainPageToUniversity(
            @PathVariable Long universityId,
            @PathVariable Long pageID
    ){
        return universityService.connectMainPageToUniversity(universityId, pageID);
    }
}
