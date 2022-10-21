package com.example.cms.user.projections;

import com.example.cms.security.Role;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoDetailed {
    private Long id;
    private String username;
    private String password; // TODO: remove?
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private String description;
    private Role accountType;
    private boolean enabled;
    private Set<UniversityDtoSimple> enrolledUniversities;

    public static UserDtoDetailed of(User user) {
        if (user == null) {
            return null;
        }
        return new UserDtoDetailed(user);
    }

    private UserDtoDetailed(User user) {
        id = user.getId();
        username = user.getUsername();
        password = user.getPassword();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        email = user.getEmail();
        address = user.getAddress();
        phoneNumber = user.getPhoneNumber();
        accountType = user.getAccountType();
        description = user.getDescription();
        enabled = user.isEnabled();
        enrolledUniversities = user.getEnrolledUniversities().stream().map(UniversityDtoSimple::of).collect(Collectors.toSet());
    }
}
