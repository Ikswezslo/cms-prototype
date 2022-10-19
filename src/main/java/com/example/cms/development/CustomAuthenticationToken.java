package com.example.cms.development;

import com.example.cms.security.LoggedUser;
import com.example.cms.security.Role;
import com.example.cms.university.University;
import com.example.cms.user.User;
import org.springframework.security.authentication.TestingAuthenticationToken;

import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;

public class CustomAuthenticationToken {

    private CustomAuthenticationToken() {
    }

    public static TestingAuthenticationToken create(Role accountType, Set<Long> universities) {
        return create(accountType, universities, 0L);
    }

    public static TestingAuthenticationToken create(Role accountType, Set<Long> universities, Long id) {
        User user = new User();
        user.setId(id);
        user.setUsername("Admin");
        user.setPassword("");
        user.setAccountType(accountType);
        user.setEnabled(true);
        user.setEnrolledUniversities(universities.stream().map(universityId -> {
            var university = new University();
            university.setId(universityId);
            return university;
        }).collect(Collectors.toSet()));
        LoggedUser loggedUser = new LoggedUser(user);
        return new TestingAuthenticationToken(loggedUser, null, new ArrayList<>(loggedUser.getAuthorities()));
    }
}
