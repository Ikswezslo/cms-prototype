package com.example.cms.pages;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PageRepository extends JpaRepository<Page, Long> {
    List<Page> findAllByParent(Page parent);

    boolean existsByParent(Page parent);

}
