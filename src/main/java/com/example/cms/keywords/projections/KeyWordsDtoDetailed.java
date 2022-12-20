package com.example.cms.keywords.projections;

import com.example.cms.keywords.KeyWords;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KeyWordsDtoDetailed {
    private Long id;
    private String word;

    private KeyWordsDtoDetailed(KeyWords keyWords) {
        id = keyWords.getId();
        word = keyWords.getWord();
    }

    public static KeyWordsDtoDetailed of(KeyWords keyWords) {
        if (keyWords == null) {
            return null;
        }
        return new KeyWordsDtoDetailed(keyWords);
    }
}
