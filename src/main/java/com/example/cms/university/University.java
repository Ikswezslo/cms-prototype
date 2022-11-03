package com.example.cms.university;

import com.example.cms.page.Page;
import com.example.cms.university.projections.UniversityDtoForm;
import com.example.cms.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "users_enrolled",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "university_id")
    )
    private Set<User> enrolledUsers = new HashSet<>();

    @OneToOne(orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "main_page_id", referencedColumnName = "id")
    private Page mainPage;

    @Column(unique = true)
    @NotBlank(message = "Name must not be empty")
    private String name;
    @Column(unique = true)
    @NotBlank(message = "Short name must not be empty")
    private String shortName;

    @NotBlank(message = "Description must not be empty")
    private String description;
    private boolean hidden;

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

    public void updateFrom(final University source){
        name = source.getName();
        shortName = source.getShortName();
        description = source.getDescription();
        hidden = source.isHidden();
        mainPage = source.getMainPage();
        enrolledUsers = source.getEnrolledUsers();
    }

    void updateFromEditedForm(UniversityDtoForm form){
        name = form.getName();
        shortName = form.getShortName();
        description = form.getDescription();
    }
}
