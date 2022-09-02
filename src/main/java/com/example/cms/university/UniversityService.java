package com.example.cms.university;


import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
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
            throw new BadRequestException("Name taken");
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
}
