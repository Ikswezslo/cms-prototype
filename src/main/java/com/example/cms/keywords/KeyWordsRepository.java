package com.example.cms.keywords;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyWordsRepository extends JpaRepository<KeyWords, Long> {
}
