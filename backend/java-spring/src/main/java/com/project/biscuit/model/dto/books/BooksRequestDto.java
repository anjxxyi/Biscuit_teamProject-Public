package com.project.biscuit.model.dto.books;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BooksRequestDto {
    private String title;
    private String isbn;
    private int display;
    private int start;
    private String sort;
    private String userId;
}
