package com.example.cms.pages;

import com.example.cms.University.University;
import com.example.cms.user.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "pages")
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Title must not be empty")
    private String title;
    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(message = "Creator must not be null")
    @JoinColumn(name = "creator_id")
    private User creator;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(message = "University must not be null")
    @JoinColumn(name = "university_id")
    private University university;
    private boolean hidden;
    @NotNull(message = "Content must not be null")
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
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
}
