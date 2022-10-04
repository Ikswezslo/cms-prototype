package com.example.cms.user;

import com.example.cms.security.LoggedUser;
import com.example.cms.security.SecurityService;
import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoForm;
import com.example.cms.user.projections.UserDtoSimple;
import com.example.cms.validation.exceptions.BadRequestException;
import com.example.cms.validation.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    UserService(final UserRepository repository,
                PasswordEncoder passwordEncoder,
                SecurityService securityService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.securityService = securityService;
    }

    public List<UserDtoSimple> getUsers() {
        return repository.findAll().stream().map(UserDtoSimple::new).collect(Collectors.toList());
    }

    public UserDtoDetailed getUser(Long id) {
        return repository.findById(id).map(UserDtoDetailed::new).orElseThrow(NotFoundException::new);
    }

    public UserDtoDetailed createUser(UserDtoForm form) {
        if (repository.existsByUsername(form.getUsername())) {
            throw new BadRequestException("Username taken");
        }

        return new UserDtoDetailed(repository.save(formToUser(form)));
    }

    public UserDtoDetailed updateUser(Long id, UserDtoForm form) {
        if (repository.existsByUsernameAndIdNot(form.getUsername(), id)) {
            throw new BadRequestException("Username taken");
        }

        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        user.updateUser(formToUser(form));
        return new UserDtoDetailed(repository.save(user));
    }

    public void deleteUser(Long id) {
        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        repository.delete(user);
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
        User user = repository.findByUsername(loggedUser.getUsername())
                .orElseThrow(() -> {
                            throw new BadRequestException("Not found logged user");
                        }
                );
        return new UserDtoDetailed(user);
    }

    public void modifyEnabledField(long id, boolean enabled) {
        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        user.setEnabled(enabled);
        repository.save(user);
    }

    public void modifyPasswordField(long id, Map<String, String> passwordMap) {
        if (!passwordMap.containsKey("oldPassword") || !passwordMap.containsKey("newPassword")) {
            throw new BadRequestException("Body does not contains correct fields");
        }
        String oldPassword = passwordMap.get("oldPassword");
        String newPassword = passwordMap.get("newPassword");

        User user = repository.findById(id).orElseThrow(NotFoundException::new);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadRequestException("Wrong password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
    }
}
