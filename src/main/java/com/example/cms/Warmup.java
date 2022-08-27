package com.example.cms;

import com.example.cms.page.Page;
import com.example.cms.page.PageRepository;
import com.example.cms.security.Role;
import com.example.cms.university.University;
import com.example.cms.university.UniversityRepository;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
class Warmup implements ApplicationListener<ContextRefreshedEvent> {

    private final PageRepository pageRepository;
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
    private final PasswordEncoder passwordEncoder;

    Warmup(final PageRepository pageRepository,
           final UserRepository userRepository,
           final UniversityRepository universityRepository,
           PasswordEncoder passwordEncoder) {
        this.pageRepository = pageRepository;
        this.userRepository = userRepository;
        this.universityRepository = universityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        log.info("Creating dummy data");

        User admin = new User(1L, "admin", passwordEncoder.encode("12345"),
                "Bob", "Kovalski", "bob123@gmail.com",
                "Piotrowo 1", "123456789", Role.ADMIN,
                0L, false
        );
        User moderator = new User(2L, "moderator", passwordEncoder.encode("1234"),
                "Riker", "Bobowski", "riker123@gmail.com",
                "Piotrowo 2", "727456789", Role.MODERATOR,
                0L, false
        );
        User user = new User(3L, "user", passwordEncoder.encode("123"),
                "Adam", "Nowak", "adam123@gmail.com",
                "Piotrowo 3", "722351974", Role.USER,
                0L, false
        );

        userRepository.saveAll(
                List.of(admin, moderator, user)
        );

        University put = new University("Poznan University of Technology", "PUT", false);
        University zut = new University("West Pomeranian University of Technology", "ZUT", true);

        put.enrollUsers(admin);
        universityRepository.saveAll(List.of(put, zut));


        var p1 = new Page();
        p1.setId(1L);
        p1.setTitle("Title 1");
        p1.setCreator(admin);
        p1.setContent("Some content");
        p1.setUniversity(put);
        pageRepository.save(p1);

        var p2 = new Page();
        p2.setId(2L);
        p2.setTitle("Title 2");
        p2.setCreator(moderator);
        p2.setContent("Other content");
        p2.setParent(p1);
        p2.setUniversity(put);
        pageRepository.save(p2);

        var p3 = new Page();
        p3.setId(3L);
        p3.setTitle("Title 3");
        p3.setCreator(admin);
        p3.setContent("Nice content");
        p3.setParent(p2);
        p3.setHidden(true);
        p3.setUniversity(put);
        pageRepository.save(p3);

        var p4 = new Page();
        p4.setId(4L);
        p4.setTitle("Title 4");
        p4.setCreator(moderator);
        p4.setContent("Very nice content");
        p4.setParent(p1);
        p4.setUniversity(put);
        pageRepository.save(p4);
    }
}
