package com.example.cms.University;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {

    @Query("SELECT university FROM University university WHERE university.name = ?1")
    Optional<University> findUniversitiesByName(String name);
}
