package com.example.cms.university;

import com.example.cms.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "universities")
@Getter
@Setter
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
    private boolean hidden;

    public University() {

    }

    public University(String name,
                      String shortName,
                      Boolean isHidden) {
        this.name = name;
        this.shortName = shortName;
        this.hidden = isHidden;
    }

    @Override
    public String toString() {
        return "University{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", shortName='" + shortName + '\'' +
                ", isHidden=" + hidden +
                '}';
    }

    public void enrollUsers(User user) {
        enrolledUsers.add(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        University that = (University) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}