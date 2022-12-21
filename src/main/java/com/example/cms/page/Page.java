package com.example.cms.page;

import com.example.cms.university.University;
import com.example.cms.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "pages")
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Title must not be empty")
    private String title;
    @NotBlank(message = "Description must not be empty")
    private String description;
    @NotNull(message = "Content must not be null")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Content content;
    private boolean hidden;
    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(message = "Creator must not be null")
    private User creator;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(message = "University must not be null")
    private University university;
    @ManyToOne(fetch = FetchType.LAZY)
    private Page parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private Set<Page> children = new HashSet<>();
    private Timestamp createdOn;
    private Timestamp updatedOn;
    private String keyWords;

    @PrePersist
    private void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        createdOn = Timestamp.valueOf(now);
        updatedOn = Timestamp.valueOf(now);
    }

    @PreUpdate
    private void preMerge() {
        updatedOn = Timestamp.valueOf(LocalDateTime.now());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Page page = (Page) o;
        return id != null && Objects.equals(id, page.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
