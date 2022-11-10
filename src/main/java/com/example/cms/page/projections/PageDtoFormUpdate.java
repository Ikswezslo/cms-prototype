package com.example.cms.page.projections;

import com.example.cms.page.Page;
import lombok.Value;

@Value
public class PageDtoFormUpdate {
    String title;
    String description;

    public void updatePage(Page page) {
        page.setTitle(title);
        page.setDescription(description);
    }
}
