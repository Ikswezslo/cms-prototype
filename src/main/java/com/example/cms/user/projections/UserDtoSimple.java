package com.example.cms.user.projections;

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

    public UserDtoSimple(User user) {
        id = user.getId();
        username = user.getUsername();
        firstName = user.getFirstName();
        lastName = user.getLastName();
    }
}
