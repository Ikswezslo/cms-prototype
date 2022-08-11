package com.example.cms.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/user")
public class UserController {
    @GetMapping
    public List<User> getUsers(){
        return List.of(
                new User(0L, "admin", "admin",
                        "Bob", "Kovalski", "bob123@gmail.com",
                        "Piotrowo 1", "123456789", "admin",
                        0L, false)
        );
    }
}
