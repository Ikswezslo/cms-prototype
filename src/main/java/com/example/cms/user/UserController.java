package com.example.cms.user;

import com.example.cms.user.projections.UserD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin // TODO: needs to be changed later
@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserD> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(path = "/{id}")
    public UserD getUser(@PathVariable long id) {
        return userService.getUser(id);
    }

    @PostMapping
    public ResponseEntity<UserD> createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updateUser(@PathVariable long id, @RequestBody User toUpdate) {
        return userService.updateUser(id, toUpdate);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable long id) {
        return userService.deleteUser(id);
    }
}
