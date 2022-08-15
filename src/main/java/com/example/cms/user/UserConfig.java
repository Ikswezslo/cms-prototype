package com.example.cms.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args->{
            User bob = new User(0L, "admin", "admin",
                    "Bob", "Kovalski", "bob123@gmail.com",
                    "Piotrowo 1", "123456789", "admin",
                    0L, false
            );
            User riker = new User(0L, "admin", "admin",
                    "Riker", "Bobowski", "riker123@gmail.com",
                    "Piotrowo 1", "727456789", "admin",
                    0L, false
            );

            repository.saveAll(
                    List.of(bob, riker)
            );
        };
    }
}
