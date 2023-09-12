package com.project.biscuit.model.dto;

import com.project.biscuit.model.Booklog;
import com.project.biscuit.model.BooklogArticle;
import com.project.biscuit.model.Books;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BooklogArticleResponse {

    private Long no;

    private String title;
    private String content;
    private Long likes;
    private Long cnt;
    private String groups;
    private String kinds;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    private Booklog booklog_no;
    private Books books_no;

    public BooklogArticleResponse (BooklogArticle booklogArticle){
        this.no = booklogArticle.getNo();

        this.title = booklogArticle.getTitle();
        this.content = booklogArticle.getContent();
        this.likes = booklogArticle.getLikes();
        this.cnt = booklogArticle.getCnt();
        this.groups = booklogArticle.getGroups();
        this.kinds = booklogArticle.getKinds();

        this.created_at = booklogArticle.getCreatedAt();
        this.updated_at = booklogArticle.getUpdatedAt();

        this.booklog_no = booklogArticle.getBooklog();
        this.books_no = booklogArticle.getBooks();
    }

}
