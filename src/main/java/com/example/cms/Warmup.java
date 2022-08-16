package com.example.cms;

import com.example.cms.University.University;
import com.example.cms.University.UniversityRepository;
import com.example.cms.pages.Page;
import com.example.cms.pages.PageRepository;
import com.example.cms.user.User;
import com.example.cms.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Slf4j
@Component
class Warmup implements ApplicationListener<ContextRefreshedEvent> {

    private final PageRepository pageRepository;
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;

    Warmup(final PageRepository pageRepository,
           final UserRepository userRepository,
           final UniversityRepository universityRepository) {
        this.pageRepository = pageRepository;
        this.userRepository = userRepository;
        this.universityRepository = universityRepository;
    }

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        log.info("Application warmup after context refreshed");

        var user = new User();
        user.setId(1L);
        user.setFirstName("Tom");
        userRepository.save(user);

        var uni = new University();
        uni.setId(1L);
        uni.setName("PUT");
        universityRepository.save(uni);

        var p1 = new Page();
        p1.setId(1L);
        p1.setTitle("Title 1");
        p1.setCreator(user);
        p1.setContent("Some content");
        p1.setUniversity(uni);
        pageRepository.save(p1);

        var p2 = new Page();
        p2.setId(2L);
        p2.setTitle("Title 2");
        p2.setCreator(user);
        p2.setContent("Other content");
        p2.setParent(p1);
        p2.setUniversity(uni);
        pageRepository.save(p2);

        var p3 = new Page();
        p3.setId(3L);
        p3.setTitle("Title 3");
        p3.setCreator(user);
        p3.setContent("Nice content");
        p3.setParent(p2);
        p3.setHidden(true);
        p3.setUniversity(uni);
        pageRepository.save(p3);

        var p4 = new Page();
        p4.setId(4L);
        p4.setTitle("Title 4");
        p4.setCreator(user);
        p4.setContent("Very nice content");
        p4.setParent(p1);
        p4.setUniversity(uni);
        pageRepository.save(p4);
    }
}
