package com.example.cms.user;

import com.example.cms.security.LoggedUser;
import com.example.cms.security.SecurityService;
import com.example.cms.university.University;
import com.example.cms.university.UniversityRepository;
import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoForm;
import com.example.cms.user.projections.UserDtoSimple;
import com.example.cms.validation.exceptions.BadRequestException;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
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
        return userRepository.findAll().stream().map(UserDtoSimple::new).collect(Collectors.toList());
    }

    public UserDtoDetailed getUser(Long id) {
        return userRepository.findById(id).map(UserDtoDetailed::new).orElseThrow(NotFoundException::new);
    }

    public UserDtoDetailed createUser(UserDtoForm form) {
        if (userRepository.existsByUsername(form.getUsername())) {
            throw new BadRequestException("Username taken");
        }

        return new UserDtoDetailed(userRepository.save(formToUser(form)));
    }

    public UserDtoDetailed updateUser(Long id, UserDtoForm form) {
        if (userRepository.existsByUsernameAndIdNot(form.getUsername(), id)) {
            throw new BadRequestException("Username taken");
        }

        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        user.updateUser(formToUser(form));
        return new UserDtoDetailed(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        userRepository.delete(user);
    }

    public User formToUser(UserDtoForm form) {
        User user = new User();

        user.setUsername(form.getUsername());
        if (form.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(form.getPassword()));
        }
        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setAddress(form.getAddress());
        user.setPhoneNumber(form.getPhoneNumber());
        user.setEmail(form.getEmail());
        user.setAccountType(form.getAccountType());
        user.setEnabled(form.isEnabled());
        return user;
    }

    public UserDtoDetailed getLoggedUser() {
        LoggedUser loggedUser = securityService.getPrincipal();
        User user = userRepository.findByUsername(loggedUser.getUsername())
                .orElseThrow(() -> {
                            throw new BadRequestException("Not found logged user");
                        }
                );
        return new UserDtoDetailed(user);
    }

    public void modifyEnabledField(long id, boolean enabled) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        user.setEnabled(enabled);
        userRepository.save(user);
    }

    public UserDtoDetailed addUniversity(long userId, long universityId) {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        University university = universityRepository.findById(universityId).orElseThrow(NotFoundException::new);
        university.getEnrolledUsers().add(user);

        return new UserDtoDetailed(userRepository.save(user));
    }
}
