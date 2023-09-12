package com.project.biscuit.model.dto.books;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.Bookclip;
import com.project.biscuit.model.Books;
import com.project.biscuit.model.view.BookclipAndBookcnt;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BookClipResponseDto {
    private Long no;
    private String delYn;
    private Books books;
    private long bcnt;
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;

    public BookClipResponseDto(Bookclip bkc, BookclipAndBookcnt bkcabc) {
        this.no = bkc.getNo();
        this.delYn = bkc.getDelYn();
        this.books = bkc.getBooks();
        this.bcnt = bkcabc.getBcnt();
        this.createdAt = bkc.getCreatedAt();
        this.updatedAt = bkc.getUpdatedAt();
    }
    public BookClipResponseDto(Bookclip bkc) {
        this.no = bkc.getNo();
        this.delYn = bkc.getDelYn();
        this.books = bkc.getBooks();
        this.createdAt = bkc.getCreatedAt();
        this.updatedAt = bkc.getUpdatedAt();
    }
}
