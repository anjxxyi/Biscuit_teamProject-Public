package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(callSuper=false)
public class Event extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '이벤트번호'")

    private Long no;

    @Column(columnDefinition = "varchar(225) comment '제목'" , nullable = false)
    private String title;

    @Column(columnDefinition = "text comment '내용'" , nullable = false)
    private String content;

    @Column(columnDefinition = "bigint comment '이벤트참여자수'" , nullable = false)
    private Long cnt;

    @Column(columnDefinition = "bigint comment '좋아요'" , nullable = false)
    private Long likes;

    @Column(columnDefinition = "varchar(1) comment '삭제여부'" , nullable = false)
    private String del_yn;

    @Column(columnDefinition = "datetime(6) comment '이벤트시작일'" , nullable = true)
    private LocalDateTime event_start;

    @Column(columnDefinition = "datetime(6) comment '이벤트시작일'" , nullable = true)
    private LocalDateTime event_end;

    @Column(columnDefinition = "varchar(100) comment '이벤트타입'" , nullable = true)
    private String eventType;

    @ManyToOne
    @ToString.Exclude
    private Images images;

//    // join column
//    @OneToMany
//    @JoinColumn(name = "event_no")
//    @ToString.Exclude
//    private List<Participation> participationList;

    public void update(String title,
                       String content,
                       String del_yn,
                       Long cnt,
                       Long likes,
                       Images imagesNo,
                       String eventType,
                       LocalDateTime event_start,
                       LocalDateTime event_end) {
        this.title = title;
        this.content = content;
        this.del_yn = del_yn;
        this.cnt = cnt;
        this.likes = likes;
        this.images = imagesNo;
        this.eventType = eventType;
        this.event_start = event_start;
        this.event_end = event_end;

    }

}
