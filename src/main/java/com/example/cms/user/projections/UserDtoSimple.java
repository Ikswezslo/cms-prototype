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
        id = user.getId();
        username = user.getUsername();
        firstName = user.getFirstName();
        lastName = user.getLastName();
    }
}
