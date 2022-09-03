package com.example.cms.university;

import com.example.cms.university.exceptions.UniversityException;
import com.example.cms.university.exceptions.UniversityExceptionType;

import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;

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
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;
    private final PageRepository pageRepository;

    @Autowired
    public UniversityService(UniversityRepository universityRepository, UserRepository userRepository, PageRepository pageRepository) {
        this.universityRepository = universityRepository;
        this.userRepository = userRepository;
        this.pageRepository = pageRepository;
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

    public ResponseEntity<UniversityD> connectMainPageToUniversity(Long universityId, Long pageId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);

        university.setMainPage(page);
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new UniversityD(result));
    }


    public UniversityD getUniversity(long id) {
        return universityRepository.findById(id).map(UniversityD::new).orElseThrow(NotFoundException::new);

    }

    public ResponseEntity<UniversityD> addNewUniversity(University university) {
        Optional<University> universitiesByName = universityRepository.findUniversitiesByName(university.getName());
        if (universitiesByName.isPresent()) {
            throw new UniversityException(UniversityExceptionType.NAME_TAKEN);
        }
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new UniversityD(result));
    }

    public ResponseEntity<UniversityD> setUn_Hide(Long id, boolean un_hide) {
        University university = universityRepository.findById(id).orElseThrow(NotFoundException::new);
        university.setHidden(un_hide);
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new UniversityD(result));
    }

    public ResponseEntity<Void> deleteUniversity(Long id) {
        University university = universityRepository.findById(id).orElseThrow(NotFoundException::new);
        validateForDelete(university);
        universityRepository.delete(university);
        return ResponseEntity.noContent().build();
    }
    private void validateForDelete(University university){
        if(!university.isHidden()){
            throw new UniversityException(UniversityExceptionType.UNIVERSITY_IS_NOT_HIDDEN);
        }
//        if(university.getMainPage() != null){
//            throw new UniversityException(UniversityExceptionType.CONTENT_EXISTS);
//        }
        Set<User> enrolledUsers = university.getEnrolledUsers();
        for(User user: enrolledUsers){
            if(user.isEnabled()){
                throw new UniversityException(UniversityExceptionType.ACTIVE_USER_EXISTS);
            }
        }
    }
}
