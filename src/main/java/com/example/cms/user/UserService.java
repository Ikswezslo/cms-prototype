package com.example.cms.user;

import com.example.cms.user.projections.UserD;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository repository;

    UserService(final UserRepository repository) {
        this.repository = repository;
    }

    public List<UserD> getUsers() {
        return repository.findAll().stream().map(UserD::new).collect(Collectors.toList());
    }

    public UserD getUser(@PathVariable long id) {
        return repository.findById(id).map(UserD::new).orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<UserD> createUser(User user) {
        User result = repository.save(user);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new UserD(result));
    }

    public ResponseEntity<Void> updateUser(long id, User toUpdate) {
        repository.findById(id)
                .ifPresentOrElse(user -> {
                    user.updateUser(toUpdate);
                    repository.save(user);
                }, NotFoundException::new);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        repository.delete(user);
        return ResponseEntity.noContent().build();
    }
}
