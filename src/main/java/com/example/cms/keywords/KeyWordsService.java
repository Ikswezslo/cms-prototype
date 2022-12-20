package com.example.cms.keywords;

import com.example.cms.keywords.projections.KeyWordsDtoDetailed;
import com.example.cms.validation.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeyWordsService {
    private final KeyWordsRepository keyWordsRepository;

    public KeyWordsDtoDetailed get(Long id) {
        return keyWordsRepository.findById(id).map(KeyWordsDtoDetailed::of).orElseThrow(NotFoundException::new);
    }

    @Secured("ROLE_MODERATOR")
    public List<KeyWordsDtoDetailed> getAll() {
        return keyWordsRepository.findAll().stream().map(KeyWordsDtoDetailed::of).collect(Collectors.toList());
    }

    @Secured("ROLE_ADMIN")
    public KeyWordsDtoDetailed save(String name) {
        KeyWords keyWord = new KeyWords();
        keyWord.setWord(name);

        return KeyWordsDtoDetailed.of(keyWordsRepository.save(keyWord));
    }

    @Secured("ROLE_ADMIN")
    public void modifyWordField(Long id, String word) {
        KeyWords keyWord = keyWordsRepository.findById(id).orElseThrow(NotFoundException::new);

        keyWord.setWord(word);
        keyWordsRepository.save(keyWord);
    }


    @Secured("ROLE_ADMIN")
    public void delete(Long id) {
        KeyWords keyWord = keyWordsRepository.findById(id).orElseThrow(NotFoundException::new);
        keyWordsRepository.delete(keyWord);
    }
}
