package com.example.cms.development;

import com.example.cms.page.PageService;
import com.example.cms.page.projections.PageDtoForm;
import com.example.cms.security.Role;
import com.example.cms.university.UniversityService;
import com.example.cms.university.projections.UniversityDtoForm;
import com.example.cms.user.UserService;
import com.example.cms.user.projections.UserDtoFormCreate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

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
        userService.createUser(new UserDtoForm(
                "admin",
                "Admin123",
                "Wojciech",
                "Kowalski",
                "wojciech.kowalski7342@gmail.com",
                "Piotrowo 1",
                "935283642",
                true,
                Role.ADMIN
        ));
        userService.createUser(new UserDtoForm(
                "admin_bar",
                "82477372",
                "Leszek",
                "Bartkiewicz",
                "leszek.bartkiewicz5229@gmail.com",
                "Piotrowo 2",
                "264878345",
                true,
                Role.ADMIN
        ));
        userService.createUser(new UserDtoForm(
                "admin_ban",
                "76163584",
                "Bożena",
                "Banik",
                "bożena.banik9987@gmail.com",
                "Piotrowo 39",
                "653916167",
                true,
                Role.ADMIN
        ));
        userService.createUser(new UserDtoForm(
                "moderator",
                "Moderator123",
                "Szymon",
                "Koltun",
                "szymon.koltun8441@gmail.com",
                "Piotrowo 2",
                "311222995",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_zlo",
                "54321737",
                "Roman",
                "Zlotkowski",
                "roman.zlotkowski9843@gmail.com",
                "Piotrowo 1",
                "739393723",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_rad",
                "12347174",
                "Ferdynand",
                "Radecki",
                "ferdynand.radecki1321@gmail.com",
                "Piotrowo 2",
                "727456789",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_kos",
                "12344321",
                "Mateusz",
                "Kostuch",
                "mateusz.kostuch2531@gmail.com",
                "Piotrowo 2",
                "672476734",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_szy",
                "12344321",
                "Błażej",
                "Szymkowski",
                "blazej.szymkowski5231@gmail.com",
                "Piotrowo 2",
                "738350481",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_mie",
                "12346246",
                "Marcin",
                "Mieczkowski",
                "marcin.mieczkowski7235@gmail.com",
                "Piotrowo 2",
                "830393622",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_jus",
                "96633810",
                "Ewa",
                "Jusko",
                "ewa.jusko9033@gmail.com",
                "Piotrowo 41",
                "258683257",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_hal",
                "16203735",
                "Eliza",
                "Halicka",
                "eliza.halicka8511@gmail.com",
                "Piotrowo 9",
                "852660762",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_ols",
                "79623112",
                "Igor",
                "Olszowy",
                "igor.olszowy5729@gmail.com",
                "Piotrowo 8",
                "542395438",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_gor",
                "66849995",
                "Tomasz",
                "Gorczyca",
                "tomasz.gorczyca2514@gmail.com",
                "Piotrowo 7",
                "481764007",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_sob",
                "73371466",
                "Anastazja",
                "Sobolewicz",
                "anastazja.sobolewicz7829@gmail.com",
                "Piotrowo 24",
                "343862564",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_smi",
                "12373581",
                "Arkadiusz",
                "Śmiałek",
                "arkadiusz.smiałek2512@gmail.com",
                "Piotrowo 3",
                "722351974",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "mod_kam",
                "52300742",
                "Halina",
                "Kamienska",
                "halina.kamienska3612@gmail.com",
                "Piotrowo 47",
                "662386326",
                true,
                Role.MODERATOR
        ));
        userService.createUser(new UserDtoForm(
                "user",
                "User1234",
                "Zuzanna",
                "Giertych",
                "zuzanna.giertych1196@gmail.com",
                "Piotrowo 40",
                "607386937",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_sob",
                "81177543",
                "Kornelia",
                "Sobczynska",
                "kornelia.sobczynska3202@gmail.com",
                "Piotrowo 35",
                "991417604",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_jer",
                "84584754",
                "Michał",
                "Jerzak",
                "michał.jerzak4983@gmail.com",
                "Piotrowo 1",
                "702758897",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_kul",
                "55582626",
                "Stefan",
                "Kulinski",
                "stefan.kulinski8388@gmail.com",
                "Piotrowo 31",
                "333229173",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_mic",
                "92404112",
                "Jerzy",
                "Michno",
                "jerzy.michno9332@gmail.com",
                "Piotrowo 49",
                "262637472",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_waz",
                "79172543",
                "Michal",
                "Wazowski",
                "michal.wazowski9020@gmail.com",
                "Piotrowo 44",
                "460515555",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_bie_krz",
                "77223751",
                "Krzysztof",
                "Bielak",
                "krzysztof.bielak4152@gmail.com",
                "Piotrowo 36",
                "168130688",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_zub_mat",
                "33828222",
                "Mateusz",
                "Zubek",
                "mateusz.zubek3408@gmail.com",
                "Piotrowo 29",
                "945442735",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_fia_fil",
                "84348973",
                "Filip",
                "Fialkowski",
                "filip.fialkowski6444@gmail.com",
                "Piotrowo 42",
                "411422855",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_fil_rob",
                "68962421",
                "Robert",
                "Filan",
                "robert.filan2085@gmail.com",
                "Piotrowo 9",
                "162988145",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_zyl_nik",
                "55929350",
                "Nikodem",
                "Zyla",
                "nikodem.zyla9010@gmail.com",
                "Piotrowo 28",
                "172856301",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_fra_luk",
                "28972274",
                "Łukasz",
                "Franc",
                "lukasz.franc7575@gmail.com",
                "Piotrowo 27",
                "281506654",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_rum_mar",
                "15458227",
                "Mariusz",
                "Ruminski",
                "mariusz.ruminski4387@gmail.com",
                "Piotrowo 31",
                "943157548",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_prz_dar",
                "53571072",
                "Dariusz",
                "Przybyszewski",
                "dariusz.przybyszewski8263@gmail.com",
                "Piotrowo 38",
                "481361620",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_ber_gra",
                "80323528",
                "Grażyna",
                "Bereza",
                "grażyna.bereza4794@gmail.com",
                "Piotrowo 31",
                "525852050",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_poc_luc",
                "31434866",
                "Lucyna",
                "Pociask",
                "lucyna.pociask8433@gmail.com",
                "Piotrowo 4",
                "790540150",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_was_kry",
                "75306001",
                "Krystyna",
                "Wasko",
                "krystyna.wasko5594@gmail.com",
                "Piotrowo 5",
                "889104495",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_les_bar",
                "31054045",
                "Barbara",
                "Lesak",
                "barbara.lesak4474@gmail.com",
                "Piotrowo 33",
                "963386317",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_fal_edw",
                "15692480",
                "Edward",
                "Falkowski",
                "edward.falkowski2311@gmail.com",
                "Piotrowo 45",
                "827669891",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_kos_win",
                "62048904",
                "Wincenty",
                "Kostka",
                "wincenty.kostka4672@gmail.com",
                "Piotrowo 48",
                "896274278",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_ign_dze",
                "36767244",
                "Dżesika",
                "Ignatowska",
                "dzesika.ignatowska6987@gmail.com",
                "Piotrowo 15",
                "460808376",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_kry_rok",
                "55175910",
                "Roksana",
                "Kryszak",
                "roksana.kryszak2878@gmail.com",
                "Piotrowo 6",
                "510676502",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_kem_mar",
                "13297705",
                "Marian",
                "Kempka",
                "marian.kempka2425@gmail.com",
                "Piotrowo 26",
                "276986682",
                true,
                Role.USER
        ));
        userService.createUser(new UserDtoForm(
                "user_les_ant",
                "56759333",
                "Antoni",
                "Leszczynski",
                "antoni.leszczynski7188@gmail.com",
                "Piotrowo 31",
                "667887826",
                true,
                Role.USER
        ));

        universityService.addNewUniversity(new UniversityDtoForm(
                "Poznań University of Technology",
                "PUT",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Adam Mickiewicz University in Poznań",
                "UAM",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Poznań University of Medical Sciences",
                "PUMS",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Poznań University of Economics and Business",
                "PUEB",
                "blank",
                1L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "University of Fine Arts in Poznań",
                "UFAP",
                "blank",
                2L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Wroclaw University of Technology",
                "WUT",
                "blank",
                2L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Karol Lipiński Academy of Music in Wrocław",
                "KLAMW",
                "blank",
                2L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Gdynia Maritime University",
                "GMU",
                "blank",
                3L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "Chopin University of Music",
                "CUM",
                "blank",
                3L
        ));
        universityService.addNewUniversity(new UniversityDtoForm(
                "University of Szczecin",
                "US",
                "blank",
                3L
        ));

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

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                4L,
                1L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                4L,
                1L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                17L,
                1L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                17L,
                1L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                18L,
                1L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                18L,
                1L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                5L,
                2L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                5L,
                2L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                19L,
                2L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                19L,
                2L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                20L,
                2L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                20L,
                2L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                6L,
                3L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                6L,
                3L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                21L,
                3L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                21L,
                3L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                22L,
                3L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                22L,
                3L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                7L,
                4L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                7L,
                4L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                23L,
                4L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                23L,
                4L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                24L,
                4L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                24L,
                4L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                8L,
                5L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                8L,
                5L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                25L,
                5L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                25L,
                5L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                26L,
                5L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                26L,
                5L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                9L,
                6L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                9L,
                6L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                27L,
                6L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                27L,
                6L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                28L,
                6L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                28L,
                6L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                10L,
                7L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                10L,
                7L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                29L,
                7L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                29L,
                7L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                30L,
                7L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                30L,
                7L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                11L,
                8L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                11L,
                8L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                31L,
                8L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                31L,
                8L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                32L,
                8L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                32L,
                8L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                12L,
                9L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                12L,
                9L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                33L,
                9L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                33L,
                9L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                34L,
                9L
        ));
        pageService.save(new PageDtoForm(
                "History",
                "The history of our university.",
                "",
                34L,
                9L
        ));

        pageService.save(new PageDtoForm(
                "Education",
                "The list of courses we offer.",
                "",
                13L,
                10L
        ));
        pageService.save(new PageDtoForm(
                "Research",
                "The list of research papers and other academic studies.",
                "",
                13L,
                10L
        ));
        pageService.save(new PageDtoForm(
                "Business",
                "Services and experts",
                "",
                35L,
                10L
        ));
        pageService.save(new PageDtoForm(
                "Staff",
                "The list of our staff.",
                "",
                35L,
                10L
        ));
        pageService.save(new PageDtoForm(
                "Contact",
                "This page contains contact information.",
                "",
                36L,
                10L
        ));
        pageService.save(new PageDtoForm(
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

        log.info("Created dummy data");
    }
}
