package com.example.cms.keyWords;

import com.example.cms.keyWords.projections.KeyWordsDtoDetailed;
import com.example.cms.security.SecurityService;
import com.example.cms.university.UniversityRepository;
import com.example.cms.validation.exceptions.NotFoundException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KeyWordsService {
    private final KeyWordsRepository keyWordsRepository;
    private final SecurityService securityService;

    public KeyWordsService(KeyWordsRepository keyWordsRepository,
                           SecurityService securityService) {
        this.keyWordsRepository = keyWordsRepository;
        this.securityService = securityService;
    }

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
