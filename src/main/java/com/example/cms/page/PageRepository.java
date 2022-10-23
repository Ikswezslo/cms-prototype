package com.example.cms.page;

import com.example.cms.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PageRepository extends JpaRepository<Page, Long> {
    boolean existsByParent(Page parent);

    List<Page> findByHiddenFalse(Pageable pageable);

    List<Page> findByParent(Page parent);

    boolean existsByCreator(User creator);

    List<Page> findByCreator(Pageable pageable, User creator);

}
