package com.example.cms;

import com.example.cms.pages.Page;
import com.example.cms.pages.PageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Slf4j
@Component
class Warmup implements ApplicationListener<ContextRefreshedEvent> {

    private final PageRepository pageRepository;

    Warmup(final PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        log.info("Application warmup after context refreshed");

        var p1 = new Page();
        p1.setId(1L);
        p1.setTitle("Title 1");
        p1.setCreator("Jan Kowalski");
        p1.setContent("Some content");
        pageRepository.save(p1);

        var p2 = new Page();
        p2.setId(2L);
        p2.setTitle("Title 2");
        p2.setCreator("Jan NotKowalski");
        p2.setContent("Other content");
        p2.setParent(p1);
        pageRepository.save(p2);

        var p3 = new Page();
        p3.setId(3L);
        p3.setTitle("Title 3");
        p3.setCreator("Adam");
        p3.setContent("Nice content");
        p3.setParent(p2);
        p3.setHidden(true);
        pageRepository.save(p3);

        var p4 = new Page();
        p4.setId(4L);
        p4.setTitle("Title 4");
        p4.setCreator("John");
        p4.setContent("Very nice content");
        p4.setParent(p1);
        pageRepository.save(p4);
    }
}
