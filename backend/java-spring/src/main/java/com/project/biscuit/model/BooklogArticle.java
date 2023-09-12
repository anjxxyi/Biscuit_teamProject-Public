package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(callSuper=false)
public class BooklogArticle extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '글번호'")

    private Long no;

    @Column(columnDefinition = "varchar(200) comment '제목'" , nullable = false)
    private String title;

    @Column(columnDefinition = "text comment '내용'" , nullable = false)

    private String content;

    @Column(columnDefinition = "bigint DEFAULT 0 comment '좋아요'" , nullable = false)
    private Long likes;
    
    @Column(columnDefinition = "bigint DEFAULT 0 comment '조회수'" , nullable = false)
    private Long cnt;

    @Column(columnDefinition = "varchar(200) comment '그룹'" , nullable = true)
    private String groups;

    @Column(columnDefinition = "varchar(10) comment '분류'" , nullable = false)
    private String kinds;

    // join 받을 column
    @ManyToOne
    @ToString.Exclude
    private Books books;

    // join 받을 column
    @ManyToOne
    @ToString.Exclude
    private Booklog booklog;

    // join 받을 column
    @ManyToOne
    @ToString.Exclude
    private User user;

//    // join column
//    @OneToMany
//    @JoinColumn(name = "booklog_article_no")
//    @ToString.Exclude
//    private List<Comment> commentList;

    // 북로그 글 수정하는 메소드 생성
    public void update(String title, String content , String groups , String kinds , Books books) {
        this.title = title;
        this.content = content;
        this.groups = groups;
        this.kinds = kinds;
        this.books = books;
    }

    // 조회수 증가
    public void incrementViewCount() {
        this.cnt++;
    }

}
