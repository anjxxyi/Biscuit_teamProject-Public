package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Booklog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '북로그번호'")

    private Long no;

    @Column(columnDefinition = "varchar(60) comment '북로그명'")
    private String booklogName;

    @Column(columnDefinition = "bigint comment '일일방문자'")
    private Long today;

    @Column(columnDefinition = "bigint comment '총방문자'")
    private Long total;

    @Column(columnDefinition = "bigint comment '구독자수'")
    private Long suber;

    @Column(columnDefinition = "text comment '소개글'")
    private String intro;

    @ManyToOne
    @ToString.Exclude
    private User user;

    // 북로그 수정하기 (update)
    public void update(String booklog_name , String intro){
        this.booklogName = booklog_name;
        this.intro = intro;
    }

}
