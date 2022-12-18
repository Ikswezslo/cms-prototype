package com.example.cms.university;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
    @Query("from University where " +
            "LOWER(name) LIKE :text " +
            "OR LOWER(shortName) LIKE :text " +
            "OR LOWER(description) LIKE :text")
    List<University> searchUniversities(Pageable pageable, @Param("text") String text);

    boolean existsByNameOrShortName(String name, String shortName);
}
