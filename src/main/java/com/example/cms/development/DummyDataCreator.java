package com.example.cms.development;

import com.example.cms.page.PageService;
import com.example.cms.page.projections.PageDtoFormCreate;
import com.example.cms.security.Role;
import com.example.cms.template.TemplateService;
import com.example.cms.university.UniversityService;
import com.example.cms.university.projections.UniversityDtoFormCreate;
import com.example.cms.user.UserService;
import com.example.cms.user.projections.UserDtoFormCreate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
class DummyDataCreator implements ApplicationListener<ContextRefreshedEvent> {

    private final PageService pageService;
    private final UserService userService;
    private final UniversityService universityService;
    private final TemplateService templateService;

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
        userService.createUser(new UserDtoFormCreate(
                "admin",
                "Admin123",
                "Wojciech",
                "Kowalski",
                "wojciech.kowalski7342@gmail.com",
                "935283642",
                true,
                Role.ADMIN
        ));
        userService.createUser(new UserDtoFormCreate(
                "admin_bar",
                "c9wahT0t",
                "Leszek",
                "Bartkiewicz",
                "leszek.bartkiewicz5229@gmail.com",
                "264878345",
                true,
                Role.ADMIN
        ));
        userService.createUser(new UserDtoFormCreate(
                "admin_ban",
                "2eqf1kYN",
                "Bożena",
                "Banik",
                "bożena.banik9987@gmail.com",
                "653916167",
                true,
                Role.ADMIN
        ));
        userService.createUser(new UserDtoFormCreate(
                "moderator",
                "Moderator123",
                "Szymon",
                "Koltun",
                "szymon.koltun8441@gmail.com",
                "311222995",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_zlo",
                "v4wUr5bC",
                "Roman",
                "Zlotkowski",
                "roman.zlotkowski9843@gmail.com",
                "739393723",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_rad",
                "ic1ER2ta",
                "Ferdynand",
                "Radecki",
                "ferdynand.radecki1321@gmail.com",
                "727456789",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_kos",
                "41rJ6kRM",
                "Mateusz",
                "Kostuch",
                "mateusz.kostuch2531@gmail.com",
                "672476734",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_szy",
                "EVKrFt2a",
                "Błażej",
                "Szymkowski",
                "blazej.szymkowski5231@gmail.com",
                "738350481",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_mie",
                "mTU4x1qJ",
                "Marcin",
                "Mieczkowski",
                "marcin.mieczkowski7235@gmail.com",
                "830393622",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_jus",
                "Md9pno1v",
                "Ewa",
                "Jusko",
                "ewa.jusko9033@gmail.com",
                "258683257",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_hal",
                "BDxm3IDG",
                "Eliza",
                "Halicka",
                "eliza.halicka8511@gmail.com",
                "852660762",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_ols",
                "2GuXiZCN",
                "Igor",
                "Olszowy",
                "igor.olszowy5729@gmail.com",
                "542395438",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_gor",
                "bnjIi1rp",
                "Tomasz",
                "Gorczyca",
                "tomasz.gorczyca2514@gmail.com",
                "481764007",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_sob",
                "S0FHytEq",
                "Anastazja",
                "Sobolewicz",
                "anastazja.sobolewicz7829@gmail.com",
                "343862564",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_smi",
                "VIWG10Ss",
                "Arkadiusz",
                "Śmiałek",
                "arkadiusz.smiałek2512@gmail.com",
                "722351974",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "mod_kam",
                "H7JmHV9H",
                "Halina",
                "Kamienska",
                "halina.kamienska3612@gmail.com",
                "662386326",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoFormCreate(
                "user",
                "User1234",
                "Zuzanna",
                "Giertych",
                "zuzanna.giertych1196@gmail.com",
                "607386937",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_sob",
                "TpA4ngto",
                "Kornelia",
                "Sobczynska",
                "kornelia.sobczynska3202@gmail.com",
                "991417604",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_jer",
                "qWew71P0",
                "Michał",
                "Jerzak",
                "michał.jerzak4983@gmail.com",
                "702758897",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_kul",
                "CBgm3Nrv",
                "Stefan",
                "Kulinski",
                "stefan.kulinski8388@gmail.com",
                "333229173",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_mic",
                "HRlhuR67",
                "Jerzy",
                "Michno",
                "jerzy.michno9332@gmail.com",
                "262637472",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_waz",
                "Ybjo1Gru",
                "Michal",
                "Wazowski",
                "michal.wazowski9020@gmail.com",
                "460515555",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_bie_krz",
                "3PCOA6Ao",
                "Krzysztof",
                "Bielak",
                "krzysztof.bielak4152@gmail.com",
                "168130688",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_zub_mat",
                "OcCEdD6l",
                "Mateusz",
                "Zubek",
                "mateusz.zubek3408@gmail.com",
                "945442735",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_fia_fil",
                "73wxrIm9",
                "Filip",
                "Fialkowski",
                "filip.fialkowski6444@gmail.com",
                "411422855",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_fil_rob",
                "weIlW1O9",
                "Robert",
                "Filan",
                "robert.filan2085@gmail.com",
                "162988145",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_zyl_nik",
                "WLhQi6gi",
                "Nikodem",
                "Zyla",
                "nikodem.zyla9010@gmail.com",
                "172856301",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_fra_luk",
                "Y2qWaW3A",
                "Łukasz",
                "Franc",
                "lukasz.franc7575@gmail.com",
                "281506654",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_rum_mar",
                "TmdnKr2Z",
                "Mariusz",
                "Ruminski",
                "mariusz.ruminski4387@gmail.com",
                "943157548",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_prz_dar",
                "ufgF57nq",
                "Dariusz",
                "Przybyszewski",
                "dariusz.przybyszewski8263@gmail.com",
                "481361620",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_ber_gra",
                "Aofkx7BC",
                "Grażyna",
                "Bereza",
                "grażyna.bereza4794@gmail.com",
                "525852050",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_poc_luc",
                "a3P4mH07",
                "Lucyna",
                "Pociask",
                "lucyna.pociask8433@gmail.com",
                "790540150",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_was_kry",
                "O9H90uTJ",
                "Krystyna",
                "Wasko",
                "krystyna.wasko5594@gmail.com",
                "889104495",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_les_bar",
                "FVnzcns5",
                "Barbara",
                "Lesak",
                "barbara.lesak4474@gmail.com",
                "963386317",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_fal_edw",
                "z1WYquLL",
                "Edward",
                "Falkowski",
                "edward.falkowski2311@gmail.com",
                "827669891",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_kos_win",
                "TKNI4X2g",
                "Wincenty",
                "Kostka",
                "wincenty.kostka4672@gmail.com",
                "896274278",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_ign_dze",
                "H97NN3xZ",
                "Dżesika",
                "Ignatowska",
                "dzesika.ignatowska6987@gmail.com",
                "460808376",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_kry_rok",
                "xGNp01Xi",
                "Roksana",
                "Kryszak",
                "roksana.kryszak2878@gmail.com",
                "510676502",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_kem_mar",
                "kVqjq419",
                "Marian",
                "Kempka",
                "marian.kempka2425@gmail.com",
                "276986682",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoFormCreate(
                "user_les_ant",
                "4TNXelso",
                "Antoni",
                "Leszczynski",
                "antoni.leszczynski7188@gmail.com",
                "667887826",
                true,
                Role.USER
        ));

        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Poznań University of Technology",
                "PUT",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Adam Mickiewicz University in Poznań",
                "UAM",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Poznań University of Medical Sciences",
                "PUMS",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Poznań University of Economics and Business",
                "PUEB",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "University of Fine Arts in Poznań",
                "UFAP",
                "blank",
                2L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Wroclaw University of Technology",
                "WUT",
                "blank",
                2L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Karol Lipiński Academy of Music in Wrocław",
                "KLAMW",
                "blank",
                2L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Gdynia Maritime University",
                "GMU",
                "blank",
                3L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "Chopin University of Music",
                "CUM",
                "blank",
                3L
        ));
        universityService.addNewUniversity(new UniversityDtoFormCreate(
                "University of Szczecin",
                "US",
                "blank",
                3L
        ));

        universityService.modifyHiddenField(1L, false);
        universityService.modifyHiddenField(2L, false);
        universityService.modifyHiddenField(3L, false);
        universityService.modifyHiddenField(5L, false);
        universityService.modifyHiddenField(6L, false);
        universityService.modifyHiddenField(8L, false);
        universityService.modifyHiddenField(10L, false);

        universityService.enrollUsersToUniversity(1L, 4L);
        universityService.enrollUsersToUniversity(1L, 17L);
        universityService.enrollUsersToUniversity(1L, 18L);
        universityService.enrollUsersToUniversity(2L, 5L);
        universityService.enrollUsersToUniversity(2L, 19L);
        universityService.enrollUsersToUniversity(2L, 20L);
        universityService.enrollUsersToUniversity(3L, 6L);
        universityService.enrollUsersToUniversity(3L, 21L);
        universityService.enrollUsersToUniversity(3L, 22L);
        universityService.enrollUsersToUniversity(4L, 7L);
        universityService.enrollUsersToUniversity(4L, 23L);
        universityService.enrollUsersToUniversity(4L, 24L);
        universityService.enrollUsersToUniversity(5L, 8L);
        universityService.enrollUsersToUniversity(5L, 25L);
        universityService.enrollUsersToUniversity(5L, 26L);
        universityService.enrollUsersToUniversity(6L, 9L);
        universityService.enrollUsersToUniversity(6L, 27L);
        universityService.enrollUsersToUniversity(6L, 28L);
        universityService.enrollUsersToUniversity(7L, 10L);
        universityService.enrollUsersToUniversity(7L, 29L);
        universityService.enrollUsersToUniversity(7L, 30L);
        universityService.enrollUsersToUniversity(8L, 11L);
        universityService.enrollUsersToUniversity(8L, 31L);
        universityService.enrollUsersToUniversity(8L, 32L);
        universityService.enrollUsersToUniversity(9L, 12L);
        universityService.enrollUsersToUniversity(9L, 33L);
        universityService.enrollUsersToUniversity(9L, 34L);
        universityService.enrollUsersToUniversity(10L, 13L);
        universityService.enrollUsersToUniversity(10L, 35L);
        universityService.enrollUsersToUniversity(10L, 36L);

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                4L,
                1L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                4L,
                1L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                17L,
                1L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                17L,
                1L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                18L,
                1L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                18L,
                1L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                5L,
                2L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                5L,
                2L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                19L,
                2L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                19L,
                2L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                20L,
                2L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                20L,
                2L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                6L,
                3L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                6L,
                3L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                21L,
                3L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                21L,
                3L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                22L,
                3L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                22L,
                3L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                7L,
                4L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                7L,
                4L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                23L,
                4L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                23L,
                4L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                24L,
                4L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                24L,
                4L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                8L,
                5L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                8L,
                5L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                25L,
                5L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                25L,
                5L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                26L,
                5L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                26L,
                5L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                9L,
                6L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                9L,
                6L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                27L,
                6L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                27L,
                6L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                28L,
                6L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                28L,
                6L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                10L,
                7L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                10L,
                7L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                29L,
                7L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                29L,
                7L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                30L,
                7L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                30L,
                7L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                11L,
                8L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                11L,
                8L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                31L,
                8L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                31L,
                8L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                32L,
                8L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                32L,
                8L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                12L,
                9L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                12L,
                9L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                33L,
                9L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                33L,
                9L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                34L,
                9L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                34L,
                9L
        ));

        pageService.save(new PageDtoFormCreate(
                "Education",
                "The list of courses we offer.",
                "",
                13L,
                10L
        ));
        pageService.save(new PageDtoFormCreate(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                13L,
                10L
        ));
        pageService.save(new PageDtoFormCreate(
                "Business",
                "Services and experts",
                "",
                35L,
                10L
        ));
        pageService.save(new PageDtoFormCreate(
                "Staff",
                "The list of our staff.",
                "",
                35L,
                10L
        ));
        pageService.save(new PageDtoFormCreate(
                "Contact",
                "This page contains contact information.",
                "",
                36L,
                10L
        ));
        pageService.save(new PageDtoFormCreate(
                "History",
                "The history of our university.",
                "",
                36L,
                10L
        ));


        pageService.modifyHiddenField(1L, false);
        pageService.modifyHiddenField(2L, false);
        pageService.modifyHiddenField(3L, false);
        pageService.modifyHiddenField(4L, false);
        pageService.modifyHiddenField(5L, false);
        pageService.modifyHiddenField(6L, false);
        pageService.modifyHiddenField(7L, false);
        pageService.modifyHiddenField(8L, false);
        pageService.modifyHiddenField(9L, false);
        pageService.modifyHiddenField(10L, false);
        pageService.modifyHiddenField(11L, false);
        pageService.modifyHiddenField(12L, false);
        pageService.modifyHiddenField(13L, false);
        pageService.modifyHiddenField(14L, false);
        pageService.modifyHiddenField(15L, false);

        templateService.save("UniversityTemplate");
        templateService.modifyContentField(1L, "Template used for university main page.");
    }
}
