package com.example.cms.user.projections;

import com.example.cms.user.User;
import lombok.Value;

@Value
public class UserDtoFormUpdate {
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    String description;

    public void updateUser(User user) {
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setDescription(description);
    }
}
