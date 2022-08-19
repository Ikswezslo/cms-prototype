package com.example.cms.University;

import com.example.cms.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "universities")
public class University {

    @Id
    @SequenceGenerator(
            name = "university_sequence",
            sequenceName = "university_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "university_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "users_enrolled",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "university_id")
    )
    private Set<User> enrolledUsers = new HashSet<>();
    @NotBlank(message = "Name must not be empty")
    private String name;
    @NotBlank(message = "Short name must not be empty")
    private String shortName;
    private Boolean isHidden;

    public University(){

    }
    public University(String name,
                           String shortName,
                           Boolean isHidden){
        this.name = name;
        this.shortName = shortName;
        this.isHidden = isHidden;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Boolean getHidden() {
        return isHidden;
    }

    public void setHidden(Boolean hidden) {
        isHidden = hidden;
    }

    public Set<User> getEnrolledUsers() { return enrolledUsers;}

    @Override
    public String toString() {
        return "University{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", shortName='" + shortName + '\'' +
                ", isHidden=" + isHidden +
                '}';
    }

    public void enrollUsers(User user) {
        enrolledUsers.add(user);
    }
}
