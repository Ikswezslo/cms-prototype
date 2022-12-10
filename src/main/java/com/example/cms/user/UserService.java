package com.example.cms.user;

import com.example.cms.page.PageRepository;
import com.example.cms.security.Role;
import com.example.cms.security.SecurityService;
import com.example.cms.university.University;
import com.example.cms.university.UniversityRepository;
import com.example.cms.user.exceptions.UserException;
import com.example.cms.user.exceptions.UserExceptionType;
import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoFormCreate;
import com.example.cms.user.projections.UserDtoFormUpdate;
import com.example.cms.user.projections.UserDtoSimple;
import com.example.cms.validation.exceptions.ForbiddenException;
import com.example.cms.validation.exceptions.NotFoundException;
import com.example.cms.validation.exceptions.WrongDataStructureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
    private final PageRepository pageRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    public UserDtoDetailed getUser(Long id) {
        return userRepository.findById(id).map(UserDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    public UserDtoDetailed getLoggedUser() {
        Long id = securityService.getPrincipal().orElseThrow(NotFoundException::new).getId();
        return userRepository.findById(id).map(UserDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    public List<UserDtoSimple> getUsers() {
        return userRepository.findAll().stream().map(UserDtoSimple::of).collect(Collectors.toList());
    }

    @Secured("ROLE_MODERATOR")
    public UserDtoDetailed createUser(UserDtoFormCreate form) {
        if (userRepository.existsByUsername(form.getUsername())) {
            throw new UserException(UserExceptionType.USERNAME_TAKEN);
        }

        validatePassword(form.getPassword());

        User newUser = form.toUser(passwordEncoder);
        if (!securityService.hasHigherRoleThan(newUser.getAccountType())) {
            throw new ForbiddenException();
        }

        return UserDtoDetailed.of(userRepository.save(newUser));
    }

    private void validatePassword(String password) {
        if (password == null) {
            password = "";
        }
        Pattern pattern = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}");
        Matcher matcher = pattern.matcher(password);
        if (!matcher.find()) {
            throw new UserException(UserExceptionType.NOT_VALID_PASSWORD);
        }
    }

    @Secured("ROLE_USER")
    public UserDtoDetailed updateUser(Long id, UserDtoFormUpdate form) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUser(user)) {
            throw new ForbiddenException();
        }

        form.updateUser(user);

        return UserDtoDetailed.of(userRepository.save(user));
    }

    @Secured("ROLE_MODERATOR")
    public UserDtoDetailed updateEnrolledUniversities(long userId, List<Long> universitiesId) {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        Set<University> oldUniversities = user.getEnrolledUniversities();
        Set<University> newUniversities = universitiesId.stream().map(id -> universityRepository.findById(id)
                        .orElseThrow(() -> new UserException(UserExceptionType.NOT_FOUND_UNIVERSITY)))
                .collect(Collectors.toSet());

        Set<University> modifiedUniversities = new HashSet<>();
        modifiedUniversities.addAll(oldUniversities.stream().filter(university -> !newUniversities.contains(university))
                .collect(Collectors.toSet()));
        modifiedUniversities.addAll(newUniversities.stream().filter(university -> !oldUniversities.contains(university))
                .collect(Collectors.toSet()));

        modifiedUniversities.forEach(university -> {
            if (securityService.isForbiddenUniversity(university)) {
                throw new ForbiddenException(University.class);
            }
        });

        user.setEnrolledUniversities(newUniversities);

        securityService.invalidateUserSession(userId);
        return UserDtoDetailed.of(userRepository.save(user));
    }

    @Secured("ROLE_MODERATOR")
    public void modifyEnabledField(long id, boolean enabled) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUser(user, true)) {
            throw new ForbiddenException();
        }

        user.setEnabled(enabled);
        userRepository.save(user);
    }

    @Secured("ROLE_USER")
    public void modifyPasswordField(long id, Map<String, String> passwordMap) {
        if (!passwordMap.containsKey("oldPassword") || !passwordMap.containsKey("newPassword")) {
            throw new WrongDataStructureException();
        }
        String oldPassword = passwordMap.get("oldPassword");
        String newPassword = passwordMap.get("newPassword");

        validatePassword(newPassword);

        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUser(user)) {
            throw new ForbiddenException();
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new UserException(UserExceptionType.WRONG_PASSWORD);
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new UserException(UserExceptionType.SAME_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Secured("ROLE_USER")
    public void modifyUsernameField(long id, String username) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUser(user)) {
            throw new ForbiddenException();
        }

        if (userRepository.existsByUsername(username)) {
            throw new UserException(UserExceptionType.USERNAME_TAKEN);
        }
        user.setUsername(username);

        userRepository.save(user);
    }

    @Secured("ROLE_ADMIN")
    public void modifyAccountTypeField(long id, Map<String, Role> accountType) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUser(user, true)) {
            throw new ForbiddenException();
        }
        if (!accountType.containsKey("accountType")) {
            throw new WrongDataStructureException();
        }

        user.setAccountType(accountType.get("accountType"));

        securityService.invalidateUserSession(id);
        userRepository.save(user);
    }

    @Secured("ROLE_USER")
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (securityService.isForbiddenUser(user)) {
            throw new ForbiddenException();
        }
        validateForDelete(user);

        userRepository.delete(user);
    }

    private void validateForDelete(User user) {
        if (pageRepository.existsByCreator(user)) {
            throw new UserException(UserExceptionType.PAGES_EXISTS);
        }

        if (user.isEnabled()) {
            throw new UserException(UserExceptionType.USER_IS_ENABLED);
        }
    }

    public List<UserDtoSimple> searchUser(String text) {
        return userRepository.searchUser(text).stream()
                .map(UserDtoSimple::of)
                .collect(Collectors.toList());
    }
}
