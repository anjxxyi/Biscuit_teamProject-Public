package com.project.biscuit.model.dto;

import com.project.biscuit.model.Booklog;
import com.project.biscuit.model.BooklogArticle;
import lombok.Getter;
// Booklog 와 BooklogArticle Join 시켜주는 DTO
@Getter
public class BooklogArticleWithBooklogInfo {

    private BooklogArticle article;
    private Booklog booklog;

    public BooklogArticleWithBooklogInfo(BooklogArticle article, Booklog booklog) {
        this.article = article;
        this.booklog = booklog;
    }
}