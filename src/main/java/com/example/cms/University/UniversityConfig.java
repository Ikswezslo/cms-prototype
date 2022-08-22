package com.example.cms.university;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UniversityConfig {
    @Bean
    CommandLineRunner commandLineRunner(UniversityRepository repository){
        return args -> {
            University put = new University("Poznan University of Technology", "PUT", true);
            University zut = new University("West Pomeranian University of Technology" , "ZUT", true);
            repository.saveAll(List.of(put,zut));
        };
    }
}
