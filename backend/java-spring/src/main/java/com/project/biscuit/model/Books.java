package com.project.biscuit.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '도서등록번호'" , nullable = false)
    private Long no;

    @Column(columnDefinition = "varchar(20) comment '도서고유번호'" , nullable = false)
    private String isbn;

    @Column(columnDefinition = "varchar(256) comment '도서명'" , nullable = false)
    private String title;

    @Column(columnDefinition = "varchar(300) comment '도서소개URL'" , nullable = false)
    private String bookDtlUrl;

    @Column(columnDefinition = "varchar(300) comment '도서표지URL'" , nullable = false)
    private String bookImgUrl;

    @Column(columnDefinition = "varchar(100) comment '도서작가'" , nullable = false)
    private String author;

    @Column(columnDefinition = "text comment '작가소개'")
    private String authorDetail;

    @Column(columnDefinition = "varchar(100) comment '출판사'" , nullable = false)
    private String publisher;

    @Column(columnDefinition = "datetime(6) DEFAULT now() comment '출간일'" , nullable = false)
    @JsonFormat(pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
    private LocalDateTime publishedDate;

    @Column(columnDefinition = "text comment '도서소개'" , nullable = false)
    private String detail;

    @Column(columnDefinition = "bigint comment '도서가격'" , nullable = false)
    private Long price;

    @Column(columnDefinition = "varchar(100) comment '도서번역가'")
    private String translator;

    @Column(columnDefinition = "text comment '번역가소개'")
    private String transDetail;

}