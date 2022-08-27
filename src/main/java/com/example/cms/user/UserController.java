package com.example.cms.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @Secured("ROLE_MODERATOR")
    @GetMapping(path = "/{id}")
    User getUser(@PathVariable long id) {
        return userService.getUser(id);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody User toUpdate) {
        return userService.updateUser(id, toUpdate);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteUser(@PathVariable long id) {
        return userService.deleteUser(id);
    }
}
