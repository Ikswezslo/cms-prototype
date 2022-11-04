package com.example.cms.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByUsernameAndIdNot(String username, Long id);

    @Query("from User where " +
            "LOWER(username) LIKE :text " +
            "OR LOWER(description) LIKE :text " +
            "OR LOWER(firstName) LIKE :text " +
            "OR LOWER(lastName) LIKE :text")
    List<User> searchUser(@Param("text") String text);
}
