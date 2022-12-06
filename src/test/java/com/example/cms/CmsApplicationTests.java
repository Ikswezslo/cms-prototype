package com.example.cms;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("secured, h2")
class CmsApplicationTests {

	@Test
	void contextLoads() {
	}

}
