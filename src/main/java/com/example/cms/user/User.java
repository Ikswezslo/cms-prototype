package com.example.cms.user;

import com.example.cms.University.University;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @JsonIgnore
    @ManyToMany(mappedBy = "enrolledUsers")
    private Set<University> universities = new HashSet<>();
    @Id @GeneratedValue
    Long id;
    @NotBlank(message = "Username must not be empty")
    String username;
    @NotBlank(message = "Password must not be empty")
    String password;
    String firstName;
    String lastName;
    String email;
    String address;
    String phoneNumber;
    String accountType;
    Long universityID;
    Boolean isAccountDisabled;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public Long getUniversityID() {
        return universityID;
    }

    public void setUniversityID(Long universityID) {
        this.universityID = universityID;
    }

    public Boolean getAccountDisabled() {
        return isAccountDisabled;
    }

    public void setAccountDisabled(Boolean accountDisabled) {
        isAccountDisabled = accountDisabled;
    }
    public Set<University> getUniversities() { return universities; }

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
}