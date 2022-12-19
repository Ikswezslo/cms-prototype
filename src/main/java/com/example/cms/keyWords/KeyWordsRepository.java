package com.example.cms.keyWords;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KeyWordsRepository extends JpaRepository<KeyWords, Long> {
    Optional<KeyWords> findByWord(String word);
}
