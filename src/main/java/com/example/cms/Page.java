package com.example.cms;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pages")
public class Page {
    @Id @GeneratedValue
    Long id;
    Long parentId;
    String content;
}
