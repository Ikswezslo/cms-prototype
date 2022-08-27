package com.example.cms.user;

import com.example.cms.university.University;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToMany(mappedBy = "enrolledUsers")
    private Set<University> enrolledUniversities = new HashSet<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private String accountType;
    private Long universityID;
    private Boolean isAccountDisabled;

    public User(User user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.address = user.address;
        this.phoneNumber = user.phoneNumber;
        this.accountType = user.accountType;
        this.universityID = user.universityID;
        this.isAccountDisabled = user.isAccountDisabled;
    }

    public User(Long id, String username, String password,
                String firstName, String lastName, String email,
                String address, String phoneNumber, String accountType,
                Long universityID, Boolean isAccountDisabled) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.accountType = accountType;
        this.universityID = universityID;
        this.isAccountDisabled = isAccountDisabled;
    }

    public User(String username, String password, String firstName,
                String lastName, String email, String address,
                String phoneNumber, String accountType, Long universityID,
                Boolean isAccountDisabled) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.accountType = accountType;
        this.universityID = universityID;
        this.isAccountDisabled = isAccountDisabled;
    }

    public void updateUser(final User user) {
        this.username = user.username;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.address = user.address;
        this.phoneNumber = user.phoneNumber;
        this.accountType = user.accountType;
        this.universityID = user.universityID;
        this.isAccountDisabled = user.isAccountDisabled;
    }

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", accountType='" + accountType + '\'' +
                ", universityID=" + universityID +
                ", isAccountDisabled=" + isAccountDisabled +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}