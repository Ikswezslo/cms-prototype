package com.example.cms.university;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "universities")
public class UniversityController {
    private final UniversityService universityService;

    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping
    public List<University> getUniversities() {
        return universityService.getUniversities();
    }

    @GetMapping("/{id}")
    public University getUniversity(@PathVariable long id) {
        return universityService.getUniversity(id);
    }

    @PostMapping
    public ResponseEntity<University> registerNewUniversity(@RequestBody University university) {return universityService.addNewUniversity(university);}

    @PutMapping("/{universityId}/users/{userId}")
    public University enrollUsersToUniversity(
            @PathVariable Long universityId,
            @PathVariable Long userId
    ) {
        return universityService.enrollUsersToUniversity(universityId, userId);
    }
}
