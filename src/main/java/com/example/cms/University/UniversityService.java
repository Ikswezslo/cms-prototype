package com.example.cms.University;

import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<University> getUniversities(){
        return universityRepository.findAll();
    }


    public University enrollUsersToUniversity(Long universityId, Long userId) {
        boolean universityExists = universityRepository.existsById(universityId);
        boolean userExists = userRepository.existsById(userId);
        if(!universityExists){
            throw new IllegalStateException("University with id " + universityId + " does not exists.");
        }
        if(!userExists){
            throw new IllegalStateException("User with id " + userId + " does not exists.");

        }

        University university = universityRepository.findById(universityId).get();
        User user = userRepository.findById(userId).get();

        university.enrollUsers(user);
        return universityRepository.save(university);
    }

    public University getUniversity(long id) {return universityRepository.findById(id).orElseThrow(NotFoundException::new);}

    public void addNewUniversity(University university) {
        Optional<University> universitiesByName = universityRepository.findUniversitiesByName(university.getName());
        if(universitiesByName.isPresent()){
            throw new IllegalStateException("name taken");
        }
        universityRepository.save(university);
    }
}
