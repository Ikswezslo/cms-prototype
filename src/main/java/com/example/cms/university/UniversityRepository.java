package com.example.cms.university;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {

    @Query("SELECT university FROM University university WHERE university.name = ?1")
    Optional<University> findUniversitiesByName(String name);

    @Query("from University where " +
            "LOWER(name) LIKE :text " +
            "OR LOWER(description) LIKE :text")
    List<University> searchUniversities(@Param("text") String text);

    boolean existsByNameOrShortName(String name, String shortName);
}
