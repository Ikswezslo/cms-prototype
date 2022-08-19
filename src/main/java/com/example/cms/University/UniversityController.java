package com.example.cms.University;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "universities")
public class UniversityController {
    private final UniversityService universityService;

    @Autowired
    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }
    @GetMapping
    public List<University> getUniversities(){
        return universityService.getUniversities();
    }

    @GetMapping("/{id}")
    public University getUniversity(@PathVariable long id) {return universityService.getUniversity(id);}

    @PostMapping
    public void registerNewUniversity(@RequestBody University university) {universityService.addNewUniversity(university);}

    @PutMapping("/{universityId}/users/{userId}")
    public University enrollUsersToUniversity(
            @PathVariable Long universityId,
            @PathVariable Long userId
    ){
        return universityService.enrollUsersToUniversity(universityId, userId);
    }
}
