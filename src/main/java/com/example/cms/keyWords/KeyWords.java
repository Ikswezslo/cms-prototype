package com.example.cms.keyWords;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

@Entity
@Table(name = "keyWords")
@Getter
@Setter
@ToString
public class KeyWords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Word must not be empty")
    private String word;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        KeyWords keyWords = (KeyWords) o;
        return id != null && Objects.equals(id, keyWords.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
