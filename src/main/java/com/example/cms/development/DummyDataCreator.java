package com.example.cms.development;

import com.example.cms.page.PageService;
import com.example.cms.page.projections.PageDtoFormCreate;
import com.example.cms.security.Role;
import com.example.cms.university.UniversityService;
import com.example.cms.university.projections.UniversityDtoFormCreate;
import com.example.cms.user.UserService;
import com.example.cms.user.projections.UserDtoFormCreate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
class DummyDataCreator implements ApplicationListener<ContextRefreshedEvent> {

    private final PageService pageService;
    private final UserService userService;
    private final UniversityService universityService;

    DummyDataCreator(final PageService pageService,
                     final UserService userService,
                     final UniversityService universityService) {
        this.pageService = pageService;
        this.userService = userService;
        this.universityService = universityService;
    }

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        try {
            SecurityContext ctx = SecurityContextHolder.createEmptyContext();
            SecurityContextHolder.setContext(ctx);
            ctx.setAuthentication(CustomAuthenticationToken.create(Role.ADMIN, Set.of()));

            createData();
            log.info("Created dummy data");
        } finally {
            SecurityContextHolder.clearContext();
        }
    }

    private void createData() {
        UserDtoFormCreate admin = new UserDtoFormCreate(
                "admin",
                "Admin123",
                "Bob",
                "Kovalski",
                "bob123@gmail.com",
                "Piotrowo 1",
                "123456789",
                true,
                Role.ADMIN
        );
        userService.createUser(admin);

        UserDtoFormCreate moderator = new UserDtoFormCreate(
                "moderator",
                "Moderator123",
                "Riker",
                "Bobowski",
                "riker123@gmail.com",
                "Piotrowo 2",
                "727456789",
                true,
                Role.MODERATOR
        );
        userService.createUser(moderator);

        UserDtoFormCreate user = new UserDtoFormCreate(
                "user",
                "User1234",
                "Adam",
                "Nowak",
                "adam123@gmail.com",
                "Piotrowo 3",
                "722351974",
                true,
                Role.USER
        );
        userService.createUser(user);

        UniversityDtoFormCreate zut = new UniversityDtoFormCreate(
                "West Pomeranian University of Technology",
                "ZUT",
                "user"
        );
        universityService.addNewUniversity(zut);

        UniversityDtoFormCreate put = new UniversityDtoFormCreate(
                "Poznan University of Technology",
                "PUT",
                "admin"
        );
        universityService.addNewUniversity(put);

        universityService.enrollUsersToUniversity(1L, 1L);

        var p1 = new PageDtoFormCreate(
                "Title 1",
                "Description 1",
                "moderator",
                1L
        );
        pageService.save(p1);

        var p2 = new PageDtoFormCreate(
                "Title 2",
                "Description 2",
                "admin",
                1L
        );
        pageService.save(p2);

        var p3 = new PageDtoFormCreate(
                "Title 3",
                "Description 3",
                "admin",
                1L
        );
        pageService.save(p3);

        var p4 = new PageDtoFormCreate(
                "Title 4",
                "Description 4",
                "admin",
                1L
        );
        pageService.save(p4);

        pageService.modifyHiddenField(1L, false);
        pageService.modifyHiddenField(2L, false);
        pageService.modifyHiddenField(3L, false);

    }
}
