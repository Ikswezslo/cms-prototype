package com.example.cms.keyWords;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cms.keyWords.projections.KeyWordsDtoDetailed;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "keyWords")
public class KeyWordsController {
    private final KeyWordsService service;

    public KeyWordsController(KeyWordsService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    KeyWordsDtoDetailed readSingleKeyWord(@PathVariable long id) {
        return service.get(id);
    }

    @GetMapping("/all")
    List<KeyWordsDtoDetailed> readAllKeyWords() {
        return service.getAll();
    }

    @PostMapping
    ResponseEntity<KeyWordsDtoDetailed> createKeyWord(@RequestBody String word) {
        KeyWordsDtoDetailed result = service.save(word);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PostMapping("/{id}")
    ResponseEntity<KeyWordsDtoDetailed> updateKeyWord(@PathVariable long id, @RequestBody String word) {
        service.modifyWordField(id, word);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteKeyWord(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
