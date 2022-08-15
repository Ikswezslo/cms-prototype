package com.example.cms.pages;

import com.example.cms.University.University;
import com.example.cms.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Title must not be empty")
    private String title;
    @NotNull(message = "Content must not be null")
    private String content;
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
    private List<Page> children;

    public void updateFrom(final Page source) {
        title = source.getTitle();
        creator = source.getCreator();
        content = source.getContent();
        parent = source.getParent();
        hidden = source.isHidden();
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
