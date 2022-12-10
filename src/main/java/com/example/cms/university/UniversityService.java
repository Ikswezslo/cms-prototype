package com.example.cms.university;

import com.example.cms.page.PageRepository;
import com.example.cms.security.SecurityService;
import com.example.cms.template.Template;
import com.example.cms.template.TemplateRepository;
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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UniversityService {
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;
    private final PageRepository pageRepository;
    private final TemplateRepository templateRepository;
    private final SecurityService securityService;

    public UniversityDtoDetailed getUniversity(Long id) {
        return universityRepository.findById(id).map(university -> {
            if (!isUniversityVisible(university)) {
                throw new ForbiddenException();
            }

            return UniversityDtoDetailed.of(university);
        }).orElseThrow(NotFoundException::new);
    }

    public List<UniversityDtoSimple> getUniversities() {
        return universityRepository.findAll().stream()
                .filter(this::isUniversityVisible)
                .map(UniversityDtoSimple::of)
                .collect(Collectors.toList());
    }

    public List<UniversityDtoSimple> searchUniversities(Pageable pageable, String text) {
        return universityRepository.searchUniversities(pageable, text).stream()
                .filter(this::isUniversityVisible)
                .map(UniversityDtoSimple::of)
                .collect(Collectors.toList());
    }

    private boolean isUniversityVisible(University university) {
        return university != null && !(university.isHidden() && securityService.isForbiddenUniversity(university));
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

        String content = templateRepository.findByName("UniversityTemplate")
                .map(Template::getContent).orElse("Default university page content");

        University newUniversity = form.toUniversity(creator, content);
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

        Set<User> enrolledUsers = university.getEnrolledUsers();
        for (User user : enrolledUsers) {
            if (user.isEnabled()) {
                throw new UniversityException(UniversityExceptionType.ACTIVE_USER_EXISTS);
            }
        }
    }
}
