package com.example.cms.user.projections;

import com.example.cms.security.Role;
import com.example.cms.university.University;
import com.example.cms.user.User;
import lombok.Value;

import java.util.Set;

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
    Role accountType;
    Long universityID;
    boolean enabled;
    Set<University> enrolledUniversities;

    public UserDtoDetailed(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.accountType = user.getAccountType();
        this.universityID = user.getUniversityID();
        this.enabled = user.isEnabled();
        this.enrolledUniversities = user.getEnrolledUniversities();
    }
}
