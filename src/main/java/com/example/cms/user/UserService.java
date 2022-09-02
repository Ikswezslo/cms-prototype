package com.example.cms.user;

import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoForm;
import com.example.cms.user.projections.UserDtoSimple;
import com.example.cms.validation.exceptions.BadRequestException;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    UserService(final UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDtoSimple> getUsers() {
        return repository.findAll().stream().map(UserDtoSimple::new).collect(Collectors.toList());
    }

    public UserDtoDetailed getUser(Long id) {
        return repository.findById(id).map(UserDtoDetailed::new).orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<UserDtoDetailed> createUser(UserDtoForm form) {
        if (repository.existsByUsername(form.getUsername())) {
            throw new BadRequestException("Username taken");
        }

        User result = repository.save(formToUser(form));
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new UserDtoDetailed(result));
    }

    public ResponseEntity<Void> updateUser(Long id, UserDtoForm form) {
        if (repository.existsByUsernameAndIdNot(form.getUsername(), id)) {
            throw new BadRequestException("Username taken");
        }

        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        user.updateUser(formToUser(form));
        repository.save(user);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Void> deleteUser(Long id) {
        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        repository.delete(user);
        return ResponseEntity.noContent().build();
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
        user.setEnabled(true);
        return user;
    }
}
