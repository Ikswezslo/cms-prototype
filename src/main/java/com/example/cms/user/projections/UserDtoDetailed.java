package com.example.cms.user.projections;

import com.example.cms.security.Role;
import com.example.cms.university.projections.UniversityDtoSimple;
import com.example.cms.user.User;
import lombok.Value;

import java.util.Set;
import java.util.stream.Collectors;

@Value
public class UserDtoDetailed {
    Long id;
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String address;
    String phoneNumber;
    String description;
    Role accountType;
    boolean enabled;
    Set<UniversityDtoSimple> enrolledUniversities;

    public UserDtoDetailed(User user) {
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
        enrolledUniversities = user.getEnrolledUniversities().stream().map(UniversityDtoSimple::new).collect(Collectors.toSet());
    }
}
