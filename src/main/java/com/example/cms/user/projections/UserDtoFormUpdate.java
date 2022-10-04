package com.example.cms.user.projections;

import lombok.Value;

@Value
public class UserDtoFormUpdate {
    String firstName;
    String lastName;
    String email;
    String address;
    String phoneNumber;
}
