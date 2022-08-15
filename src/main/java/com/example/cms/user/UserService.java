package com.example.cms.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;
import java.util.List;

@Component
public class UserService {
    private final UserRepository repository;

    @Autowired
    UserService(final UserRepository repository){this.repository = repository;}

    public List<User> getUsers(){
        return repository.findAll();
    }

    User getUser(@PathVariable long id){
        return  repository.findById(id).get();
    }

    public ResponseEntity<?> createUser(User user){
        User result = repository.save(user);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(new User(result));
    }
}
