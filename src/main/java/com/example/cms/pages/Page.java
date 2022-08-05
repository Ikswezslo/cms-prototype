package com.example.cms.pages;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "pages")
public class Page {

    @Id
    @GeneratedValue
    private Long id;
    @NotBlank(message = "Title must not be empty")
    private String title;
    @NotBlank(message = "Creator must not be empty")
    private String creator;
    @NotNull(message = "Content must not be null")
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Page parent;

    public void updateFrom(final Page source) {
        title = source.getTitle();
        creator = source.getCreator();
        content = source.getContent();
        parent = source.getParent();
    }
}
