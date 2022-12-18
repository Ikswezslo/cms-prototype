package com.example.cms.user.projections;

import com.example.cms.security.Role;
import com.example.cms.user.User;
import lombok.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

@Value
public class UserDtoFormCreate {
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    boolean enabled;
    Role accountType;

    public User toUser(PasswordEncoder passwordEncoder) {
        User user = new User();

        user.setUsername(username);
        if (password != null) {
            user.setPassword(passwordEncoder.encode(password));
        }
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhoneNumber(phoneNumber);
        user.setEmail(email);
        user.setAccountType(accountType);
        user.setEnabled(enabled);
        return user;
    }
}
