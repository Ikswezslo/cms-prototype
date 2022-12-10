package com.example.cms.page;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "contents")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @NotNull(message = "Content value must not be null")
    private String value;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Content content = (Content) o;
        return id != null && Objects.equals(id, content.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public static Content of(String value) {
        Content content = new Content();
        content.setValue(value);
        return content;
    }
}
