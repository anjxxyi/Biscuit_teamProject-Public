package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(callSuper=false)
public class Comment extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '댓글, 대댓글 번호'")

    private Long no;

    @Column(columnDefinition = "text comment '댓글 내용'" , nullable = false)
    private String content;

    @Column(columnDefinition = "varchar(1) DEFAULT 'N' comment '삭제여부'" , nullable = false)
    private String delYn;

    @Column(columnDefinition = "bigint comment '상위 댓글 번호'" , nullable = true)
    private Long upcommentNo;

    // join 받을 column
    @ManyToOne
    @ToString.Exclude
    private User user;

    // join 받을 column
    @ManyToOne
    @JoinColumn(name = "booklog_article_no")
    @ToString.Exclude
    private BooklogArticle booklogArticle;

    // 댓글 수정하는 메소드
    public void update(String content) {
        this.content = content;
    }

}
