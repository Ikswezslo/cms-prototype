package com.example.cms.user.projections;

import com.example.cms.user.User;
import lombok.Value;

@Value
public class UserDtoSimple {
    Long id;
    String username;
    String firstName;
    String lastName;

    public UserDtoSimple(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }
}
