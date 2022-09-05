package com.example.cms.university;

import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
import com.example.cms.university.exceptions.UniversityException;
import com.example.cms.university.exceptions.UniversityExceptionType;
import com.example.cms.university.projections.UniversityDtoDetailed;
import com.example.cms.university.projections.UniversityDtoForm;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.BadRequestException;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<UniversityDtoSimple> getUniversities() {
        return universityRepository.findAll().stream().map(UniversityDtoSimple::new).collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<UniversityDtoDetailed> enrollUsersToUniversity(Long universityId, Long userId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

        university.enrollUsers(user);
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new UniversityDtoDetailed(result));
    }

    public University connectMainPageToUniversity(Long universityId, Long pageId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);

        university.setMainPage(page);
        return universityRepository.save(university);
    }


    public UniversityDtoDetailed getUniversity(Long id) {
        return universityRepository.findById(id).map(UniversityDtoDetailed::new).orElseThrow(NotFoundException::new);

    }

    public ResponseEntity<UniversityDtoDetailed> addNewUniversity(UniversityDtoForm form) {
        University result = universityRepository.save(formToUniversity(form));
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new UniversityDtoDetailed(result));
    }

    public University formToUniversity(UniversityDtoForm form) {
        University university = new University();

        if (universityRepository.existsByNameOrShortName(form.getName(), form.getShortName())) {
            throw new UniversityException(UniversityExceptionType.NAME_TAKEN);
        }

        university.setName(form.getName());
        university.setShortName(form.getShortName());
        university.setHidden(true);

        Page page = new Page();
        page.setTitle(university.getName());
        page.setDescription("Short description about university.");
        page.setContent("Content for university main page.");
        page.setHidden(true);
        page.setUniversity(university);

        User creator = userRepository.findByUsername(form.getCreatorUsername())
                .orElseThrow(() -> {
                    throw new BadRequestException("Not found user");
                });

        page.setCreator(creator);

        university.setMainPage(page);

        return university;
    }

    public ResponseEntity<UniversityDtoSimple> setUn_Hide(Long id, boolean un_hide) {
        University university = universityRepository.findById(id).orElseThrow(NotFoundException::new);
        university.setHidden(un_hide);
        University result = universityRepository.save(university);
        return ResponseEntity.created(URI.create("/"+result.getId())).body(new UniversityDtoSimple(result));
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
