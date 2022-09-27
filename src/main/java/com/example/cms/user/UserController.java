package com.example.cms.user;

import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoForm;
import com.example.cms.user.projections.UserDtoSimple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserDtoSimple> getUsers() {
        return service.getUsers();
    }

    @GetMapping("/logged")
    @Secured("ROLE_USER")
    public UserDtoDetailed getLoggedUser() {
        return service.getLoggedUser();
    }

    @Secured("ROLE_MODERATOR")
    @GetMapping(path = "/{id}")
    public UserDtoDetailed getUser(@PathVariable long id) {
        return service.getUser(id);
    }

    @Secured("ROLE_USER")
    @PostMapping
    public ResponseEntity<UserDtoDetailed> createUser(@RequestBody UserDtoForm form) {
        UserDtoDetailed result = service.createUser(form);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updateUser(@PathVariable long id, @RequestBody UserDtoForm form) {
        service.updateUser(id, form);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable long id) {
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
