package com.example.cms.user;

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
import com.example.cms.validation.exceptions.NotFoundException;
import com.example.cms.validation.exceptions.WrongDataStructureException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class UserService {
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    UserService(final UserRepository userRepository,
                UniversityRepository universityRepository, PasswordEncoder passwordEncoder,
                SecurityService securityService) {
        this.userRepository = userRepository;
        this.universityRepository = universityRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityService = securityService;
    }

    public List<UserDtoSimple> getUsers() {
        return userRepository.findAll().stream().map(UserDtoSimple::of).collect(Collectors.toList());
    }

    public UserDtoDetailed getUser(Long id) {
        return userRepository.findById(id).map(UserDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    public UserDtoDetailed createUser(UserDtoFormCreate form) {
        if (userRepository.existsByUsername(form.getUsername())) {
            throw new UserException(UserExceptionType.USERNAME_TAKEN);
        }

        validatePassword(form.getPassword());

        return UserDtoDetailed.of(userRepository.save(form.toUser(passwordEncoder)));
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

    public UserDtoDetailed updateUser(Long id, UserDtoFormUpdate form) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);

        form.updateUser(user);

        return UserDtoDetailed.of(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        userRepository.delete(user);
    }

    public UserDtoDetailed getLoggedUser() {
        Long id = securityService.getPrincipal().orElseThrow(NotFoundException::new).getId();
        return userRepository.findById(id).map(UserDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    public void modifyEnabledField(long id, boolean enabled) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        user.setEnabled(enabled);
        userRepository.save(user);
    }

    public UserDtoDetailed addUniversity(long userId, long universityId) {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        University university = universityRepository.findById(universityId)
                .orElseThrow(() -> new UserException(UserExceptionType.NOT_FOUND_UNIVERSITY));
        university.getEnrolledUsers().add(user);

        securityService.invalidateUserSession(userId);
        return UserDtoDetailed.of(userRepository.save(user));
    }

    public void modifyPasswordField(long id, Map<String, String> passwordMap) {
        if (!passwordMap.containsKey("oldPassword") || !passwordMap.containsKey("newPassword")) {
            throw new WrongDataStructureException();
        }
        String oldPassword = passwordMap.get("oldPassword");
        String newPassword = passwordMap.get("newPassword");

        validatePassword(newPassword);

        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new UserException(UserExceptionType.WRONG_PASSWORD);
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new UserException(UserExceptionType.SAME_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void modifyUsernameField(long id, String username) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);

        if (userRepository.existsByUsername(username)) {
            throw new UserException(UserExceptionType.USERNAME_TAKEN);
        }
        user.setUsername(username);

        userRepository.save(user);
    }

    public void modifyAccountTypeField(long id, Map<String, Role> accountType) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        if (!accountType.containsKey("accountType")) {
            throw new WrongDataStructureException();
        }
        user.setAccountType(accountType.get("accountType"));

        securityService.invalidateUserSession(id);
        userRepository.save(user);
    }
}
