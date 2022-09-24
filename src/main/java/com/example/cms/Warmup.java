package com.example.cms;

import com.example.cms.page.PageService;
import com.example.cms.page.projections.PageDtoForm;
import com.example.cms.security.Role;
import com.example.cms.university.UniversityService;
import com.example.cms.university.projections.UniversityDtoForm;
import com.example.cms.user.UserService;
import com.example.cms.user.projections.UserDtoForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Slf4j
@Component
class Warmup implements ApplicationListener<ContextRefreshedEvent> {

    private final PageService pageService;
    private final UserService userService;
    private final UniversityService universityService;

    Warmup(final PageService pageService,
           final UserService userService,
           final UniversityService universityService) {
        this.pageService = pageService;
        this.userService = userService;
        this.universityService = universityService;
    }

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {

        UserDtoForm admin = new UserDtoForm(
                "admin",
                "12345",
                "Bob",
                "Kovalski",
                "bob123@gmail.com",
                "Piotrowo 1",
                "123456789",
                true,
                Role.ADMIN
        );
        userService.createUser(admin);

        UserDtoForm moderator = new UserDtoForm(
                "moderator",
                "1234",
                "Riker",
                "Bobowski",
                "riker123@gmail.com",
                "Piotrowo 2",
                "727456789",
                true,
                Role.MODERATOR
        );
        userService.createUser(moderator);

        UserDtoForm user = new UserDtoForm(
                "user",
                "123",
                "Adam",
                "Nowak",
                "adam123@gmail.com",
                "Piotrowo 3",
                "722351974",
                true,
                Role.USER
        );
        userService.createUser(user);

        UniversityDtoForm zut = new UniversityDtoForm(
                "West Pomeranian University of Technology",
                "ZUT",
                "user"
        );
        universityService.addNewUniversity(zut);

        UniversityDtoForm put = new UniversityDtoForm(
                "Poznan University of Technology",
                "PUT",
                "admin"
        );
        universityService.addNewUniversity(put);

        universityService.enrollUsersToUniversity(1L, 1L);

        var p1 = new PageDtoForm(
                "Title 1",
                "Description 1",
                "Other content",
                "moderator",
                1L
        );
        pageService.save(p1);

        var p2 = new PageDtoForm(
                "Title 2",
                "Description 2",
                "Other content",
                "admin",
                1L
        );
        pageService.save(p2);

        var p3 = new PageDtoForm(
                "Title 3",
                "Description 3",
                "Nice content",
                "admin",
                1L
        );
        pageService.save(p3);

        var p4 = new PageDtoForm(
                "Title 4",
                "Description 4",
                "Very nice content",
                "admin",
                1L
        );
        pageService.save(p4);

        pageService.setHidden(1L, false);
        pageService.setHidden(2L, false);
        pageService.setHidden(3L, false);

        log.info("Created dummy data");
    }
}
