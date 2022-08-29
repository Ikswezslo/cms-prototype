package com.example.cms.user;

import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoSimple;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserService {
    private final UserRepository repository;

    UserService(final UserRepository repository) {
        this.repository = repository;
    }

    public List<UserDtoSimple> getUsers() {
        return repository.findAll().stream().map(UserDtoSimple::new).collect(Collectors.toList());
    }
    public UserDtoDetailed getUser(@PathVariable long id) {
        return repository.findById(id).map(UserDtoDetailed::new).orElseThrow(NotFoundException::new);
    }

    public ResponseEntity<UserDtoSimple> createUser(User user) {
        User result = repository.save(user);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new UserDtoSimple(result));
    }

    public ResponseEntity<Void> updateUser(long id, User toUpdate) {
        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        user.updateUser(toUpdate);
        repository.save(user);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        User user = repository.findById(id).orElseThrow(NotFoundException::new);
        repository.delete(user);
        return ResponseEntity.noContent().build();
    }
}
