package com.example.cms.file;

import com.example.cms.page.Page;
import com.example.cms.user.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "files")
@Getter
@Setter
@ToString
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "File name must not be empty")
    private String filename;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(message = "Author must not be null")
    private User author;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(name = "page_fieles",
            joinColumns = @JoinColumn(name = "file_id"),
            inverseJoinColumns = @JoinColumn(name = "page_id"))
    @ToString.Exclude
    private Set<Page> page = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        File file = (File) o;
        return id.equals(file.id) && Objects.equals(filename, file.filename) && author.equals(file.author) && Objects.equals(page, file.page);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, filename, author, page);
    }
}
