package com.example.cms.user;

import com.example.cms.security.Role;
import com.example.cms.user.projections.UserDtoDetailed;
import com.example.cms.user.projections.UserDtoFormCreate;
import com.example.cms.user.projections.UserDtoFormUpdate;
import com.example.cms.user.projections.UserDtoSimple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping(path = "/{id}")
    public UserDtoDetailed getUser(@PathVariable long id) {
        return service.getUser(id);
    }

    @GetMapping("/logged")
    public UserDtoDetailed getLoggedUser() {
        return service.getLoggedUser();
    }

    @GetMapping
    public List<UserDtoSimple> getUsers() {
        return service.getUsers();
    }

    @PostMapping
    public ResponseEntity<UserDtoDetailed> createUser(@RequestBody UserDtoFormCreate form) {
        UserDtoDetailed result = service.createUser(form);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PutMapping("/{id}")
    UserDtoDetailed updateUser(@PathVariable long id, @RequestBody UserDtoFormUpdate form) {
        return service.updateUser(id, form);
    }

    @PostMapping("/{userId}/universities")
    public UserDtoDetailed addUniversityToUser(@PathVariable long userId, @RequestBody long universityId) {
        return service.addUniversity(userId, universityId);
    }

    @PatchMapping("/{id}/enabled")
    ResponseEntity<Void> modifyUserEnabledField(@PathVariable long id, @RequestBody boolean enabled) {
        service.modifyEnabledField(id, enabled);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/password")
    ResponseEntity<Void> modifyUserPasswordField(@PathVariable long id, @RequestBody Map<String, String> passwordMap) {
        service.modifyPasswordField(id, passwordMap);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/username")
    ResponseEntity<Void> modifyUserUsernameField(@PathVariable long id, @RequestBody String username) {
        service.modifyUsernameField(id, username);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/accountType")
    ResponseEntity<Void> modifyUserAccountTypeField(@PathVariable long id, @RequestBody Map<String, Role> accountType) {
        service.modifyAccountTypeField(id, accountType);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable long id) {
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
