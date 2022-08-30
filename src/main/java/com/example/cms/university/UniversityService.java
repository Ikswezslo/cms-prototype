package com.example.cms.university;

import com.example.cms.university.exceptions.UniversityException;
import com.example.cms.university.exceptions.UniversityExceptionType;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;

    @Autowired
    public UniversityService(UniversityRepository universityRepository, UserRepository userRepository) {
        this.universityRepository = universityRepository;
        this.userRepository = userRepository;
    }

    public List<University> getUniversities() {
        return universityRepository.findAll();
    }


    public University enrollUsersToUniversity(Long universityId, Long userId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

        university.enrollUsers(user);
        return universityRepository.save(university);
    }

    public University getUniversity(long id) {
        return universityRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<University> addNewUniversity(University university) {
        Optional<University> universitiesByName = universityRepository.findUniversitiesByName(university.getName());
        if (universitiesByName.isPresent()) {
            throw new UniversityException(UniversityExceptionType.NAME_TAKEN);
        }
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new University()); //TODO Change body when UniversityToSimple Created
    }
}
