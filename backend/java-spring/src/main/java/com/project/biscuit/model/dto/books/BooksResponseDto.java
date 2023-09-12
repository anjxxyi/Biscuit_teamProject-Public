package com.project.biscuit.model.dto.books;

import com.project.biscuit.model.Books;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BooksResponseDto {

    private Books book;
    private boolean cliped;


    public static BooksResponseDto of(Books book, boolean clip) {

        return BooksResponseDto.builder()
                .book(book)
                .cliped(clip)
                .build();
    }
}
