package com.example.cms.user.projections;

import com.example.cms.security.Role;
import lombok.Value;

@Value
public class UserDtoForm {
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String address;
    String phoneNumber;
    Role accountType;
}
