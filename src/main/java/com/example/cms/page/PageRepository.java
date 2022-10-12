package com.example.cms.page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PageRepository extends JpaRepository<Page, Long> {
    boolean existsByParent(Page parent);

    @Query("from Page where " +
            "(hidden = false) or " +
            "(:role = 'ADMIN') or" +
            "(:role= 'MODERATOR' and university.id in :universities) or " +
            "(:role = 'USER' and creator.id = :creator)")
    List<Page> findVisible(Pageable pageable,
                           @Param("role") String accountType,
                           @Param("universities") List<Long> universities,
                           @Param("creator") Long creator);

    @Query("from Page where hidden = false")
    List<Page> findVisible(Pageable pageable);

    @Query("from Page where parent.id = :parent and " +
            "((hidden = false) or " +
            "(:role = 'ADMIN') or" +
            "(:role= 'MODERATOR' and university.id in :universities) or " +
            "(:role = 'USER' and creator.id = :creator))")
    Set<Page> findChildren(@Param("parent") Long parentId,
                           @Param("role") String accountType,
                           @Param("universities") List<Long> universities,
                           @Param("creator") Long creator);

    @Query("from Page where parent.id = :parent and hidden = false")
    Set<Page> findChildren(@Param("parent") Long parentId);

    List<Page> findByParent(Page parent);

}
