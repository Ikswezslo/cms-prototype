package com.example.cms.user;

import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoForm;
import com.example.cms.user.projections.UserDtoSimple;
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
    public List<UserDtoSimple> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/logged")
    @Secured("ROLE_USER")
    public UserDtoDetailed getLoggedUser() {
        return userService.getLoggedUser();
    }

    @Secured("ROLE_MODERATOR")
    @GetMapping(path = "/{id}")
    public UserDtoDetailed getUser(@PathVariable long id) {
        return userService.getUser(id);
    }

    @Secured("ROLE_USER")
    @PostMapping
    public ResponseEntity<UserDtoDetailed> createUser(@RequestBody UserDtoForm form) {
        return userService.createUser(form);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updateUser(@PathVariable long id, @RequestBody UserDtoForm form) {
        return userService.updateUser(id, form);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable long id) {
        return userService.deleteUser(id);
    }
}
