package com.example.cms.page;

import com.example.cms.development.CustomAuthenticationToken;
import com.example.cms.page.projections.PageDtoSimple;
import com.example.cms.security.Role;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.net.URL;
import java.util.List;
import java.util.Set;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("secured, h2")
class PageControllerTest {

    @Autowired
    private WebApplicationContext context;
    private MockMvc mvc;
    private SecurityContext ctx;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        ctx = SecurityContextHolder.createEmptyContext();
        SecurityContextHolder.setContext(ctx);

        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void succeed() throws Exception {
        ctx.setAuthentication(CustomAuthenticationToken.create(Role.ADMIN, Set.of()));

        var result = mvc.perform(get("/pages/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        //List<PageDtoSimple> pages = objectMapper.readValue(result.getResponse().getContentAsByteArray(), new TypeReference<>() {});

    }

    @Test
    void forbidden() throws Exception {
        ctx.setAuthentication(CustomAuthenticationToken.create(Role.MODERATOR, Set.of()));

        mvc.perform(get("/pages/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    void unauthorized() throws Exception {
        mvc.perform(get("/pages/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}