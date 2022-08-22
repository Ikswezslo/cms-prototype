package com.example.cms.page;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long> {
    boolean existsByParent(Page parent);
}
