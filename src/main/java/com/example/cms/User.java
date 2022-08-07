package com.example.cms;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue
    Long id;
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String address;
    String phoneNumber;
    String accountType;
    Long universityID;
    Boolean isAccountDisabled;
}