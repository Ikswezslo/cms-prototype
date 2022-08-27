package com.example.cms.university;

import com.example.cms.university.projections.UniversityD;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;

    @Autowired
    public UniversityService(UniversityRepository universityRepository, UserRepository userRepository) {
        this.universityRepository = universityRepository;
        this.userRepository = userRepository;
    }

    public List<UniversityD> getUniversities() {
        return universityRepository.findAll().stream().map(UniversityD::new).collect(Collectors.toList());
    }


    public ResponseEntity<UniversityD> enrollUsersToUniversity(Long universityId, Long userId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

        university.enrollUsers(user);
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new UniversityD(result));
    }

    public UniversityD getUniversity(long id) {
        return universityRepository.findById(id).map(UniversityD::new).orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<UniversityD> addNewUniversity(University university) {
        Optional<University> universitiesByName = universityRepository.findUniversitiesByName(university.getName());
        if (universitiesByName.isPresent()) {
            throw new IllegalStateException("name taken");
        }
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new UniversityD(result));
    }
}
