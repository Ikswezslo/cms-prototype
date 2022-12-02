package com.example.cms.file;

import com.example.cms.page.Page;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "files")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class FileResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "File name must not be empty")
    private String filename;

    @NotBlank(message = "File type name must not be empty")
    private String fileType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] data;

    private Timestamp uploadDate;

    private String uploadedBy;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull(message = "Page must not be null")
    private Page page;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FileResource)) return false;
        FileResource that = (FileResource) o;
        return Objects.equals(id, that.id) && Objects.equals(filename, that.filename) && Objects.equals(fileType, that.fileType) && Arrays.equals(data, that.data) && Objects.equals(uploadDate, that.uploadDate) && Objects.equals(uploadedBy, that.uploadedBy) && page.equals(that.page);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, filename, fileType, uploadDate, uploadedBy, page);
        result = 31 * result + Arrays.hashCode(data);
        return result;
    }
}
