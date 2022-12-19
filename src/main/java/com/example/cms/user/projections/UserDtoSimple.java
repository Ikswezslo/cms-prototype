package com.example.cms.user.projections;

import com.example.cms.security.Role;
import com.example.cms.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoSimple {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Role accountType;
    private boolean enabled;

    public static UserDtoSimple of(User user) {
        if (user == null) {
            return null;
        }
        return new UserDtoSimple(user);
    }

    private UserDtoSimple(User user) {
        id = user.getId();
        username = user.getUsername();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        enabled = user.isEnabled();
        accountType= user.getAccountType();
    }
}
