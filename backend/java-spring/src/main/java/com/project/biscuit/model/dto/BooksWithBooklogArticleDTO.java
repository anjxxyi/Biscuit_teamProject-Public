package com.project.biscuit.model.dto;

import com.project.biscuit.model.BooklogArticle;
import com.project.biscuit.model.Books;
import lombok.Getter;

@Getter
public class BooksWithBooklogArticleDTO {
    private Books books;
    private BooklogArticle booklogArticle;

    public BooksWithBooklogArticleDTO(BooklogArticle booklogArticle , Books books) {
        this.booklogArticle = booklogArticle;
        this.books = books;
    }
}
