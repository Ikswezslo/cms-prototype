package com.example.cms.university;

import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
import com.example.cms.security.SecurityService;
import com.example.cms.university.exceptions.UniversityException;
import com.example.cms.university.exceptions.UniversityExceptionType;
import com.example.cms.university.projections.UniversityDtoDetailed;
import com.example.cms.university.projections.UniversityDtoFormCreate;
import com.example.cms.university.projections.UniversityDtoFormUpdate;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import com.example.cms.validation.exceptions.BadRequestException;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;
    private final PageRepository pageRepository;
    private final SecurityService securityService;

    @Autowired
    public UniversityService(UniversityRepository universityRepository, UserRepository userRepository,
                             PageRepository pageRepository, SecurityService securityService) {
        this.universityRepository = universityRepository;
        this.userRepository = userRepository;
        this.pageRepository = pageRepository;
        this.securityService = securityService;
    }

    public UniversityDtoDetailed getUniversity(Long id) {
        // TODO: return university only if visible
        return universityRepository.findById(id).map(UniversityDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    public List<UniversityDtoSimple> getUniversities() {
        // TODO: return only visible universities
        return universityRepository.findAll().stream().map(UniversityDtoSimple::of).collect(Collectors.toList());
    }

    @Secured("ROLE_ADMIN")
    public UniversityDtoDetailed addNewUniversity(UniversityDtoFormCreate form) {
        if (universityRepository.existsByNameOrShortName(form.getName(), form.getShortName())) {
            throw new UniversityException(UniversityExceptionType.NAME_TAKEN);
        }

        User creator = userRepository.findById(form.getCreatorId())
                .orElseThrow(() -> {
                    throw new BadRequestException("Not found user");
                });
        if (securityService.isForbiddenUser(creator)) {
            throw new ForbiddenException();
        }

        University newUniversity = form.toUniversity(creator);
        if (securityService.isForbiddenUniversity(newUniversity)) {
            throw new ForbiddenException();
        }

        return UniversityDtoDetailed.of(universityRepository.save(newUniversity));
    }

    @Secured("ROLE_MODERATOR")
    public void update(Long id, UniversityDtoFormUpdate form) {
        University university = universityRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUniversity(university)) {
            throw new ForbiddenException();
        }

        form.updateUniversity(university);
        universityRepository.save(university);
    }

    @Transactional
    @Secured("ROLE_ADMIN") // TODO: remove UniversityService#enrollUsersToUniversity
    public UniversityDtoDetailed enrollUsersToUniversity(Long universityId, Long userId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

        university.enrollUsers(user);
        University result = universityRepository.save(university);
        return UniversityDtoDetailed.of(result);
    }

    @Secured("ROLE_ADMIN") // TODO: remove UniversityService#connectMainPageToUniversity
    public University connectMainPageToUniversity(Long universityId, Long pageId) {

        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        Page page = pageRepository.findById(pageId).orElseThrow(NotFoundException::new);

        university.setMainPage(page);
        return universityRepository.save(university);
    }

    @Secured("ROLE_MODERATOR")
    public void modifyHiddenField(Long id, boolean hidden) {
        University university = universityRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUniversity(university)) {
            throw new ForbiddenException();
        }

        university.setHidden(hidden);
        universityRepository.save(university);
    }

    @Secured("ROLE_ADMIN")
    @Transactional
    public void deleteUniversity(Long id) {
        University university = universityRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUniversity(university)) {
            throw new ForbiddenException();
        }

        validateForDelete(university);
        pageRepository.delete(university.getMainPage());
        universityRepository.delete(university);
    }
    private void validateForDelete(University university) {
        if (!university.isHidden()) {
            throw new UniversityException(UniversityExceptionType.UNIVERSITY_IS_NOT_HIDDEN);
        }
//        if(university.getMainPage() != null){
//            throw new UniversityException(UniversityExceptionType.CONTENT_EXISTS);
//        }
        Set<User> enrolledUsers = university.getEnrolledUsers();
        for (User user : enrolledUsers) {
            if (user.isEnabled()) {
                throw new UniversityException(UniversityExceptionType.ACTIVE_USER_EXISTS);
            }
        }
    }

    public List<UniversityDtoSimple> searchUniversities(String text) {
        return universityRepository.searchUniversities(text).stream()
                .map(UniversityDtoSimple::of)
                .collect(Collectors.toList());
    }
}
