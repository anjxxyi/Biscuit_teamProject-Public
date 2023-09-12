package com.project.biscuit.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.dto.BookclassRequestDto;
import com.project.biscuit.model.enums.ClassStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Bookclass extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    @Column(columnDefinition = "varchar(250) comment '북클래스명'" , nullable = false)
    private String title;

    @Column(columnDefinition = "text comment '북클래스 소개'" , nullable = false)
    private String intro;

    @Column(columnDefinition = "varchar(5) comment '북클래스 장소 우편번호'" , nullable = false)
    private String zipCode;

    @Column(columnDefinition = "varchar(500) comment '북클래스 장소'" , nullable = false)
    private String location;

    @Column(columnDefinition = "varchar(100) comment '북클래스 장소 상세'")
    private String locationDetail;

    @Column(columnDefinition = "int comment '북클래스 인원'" , nullable = false)
    private int memberCnt;

    @Column(columnDefinition = "comment '클래스 상태'" , nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ClassStatus status = ClassStatus.valueOf("A");
    // 모임상태  A:신청, Y:진행, N:거절, C:취소, E:종료

    @Column(columnDefinition = "datetime(6) comment '시작 일정'" , nullable = false)
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime scheduleStart;

    @Column(columnDefinition = "datetime(6) comment '종료 일정'" , nullable = false)
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime scheduleEnd;

    // join column
    @ManyToOne
    @JoinColumn(name = "User_no")
    @ToString.Exclude
    private User userNo;

    // join column
    @ManyToOne
    @JoinColumn(name = "Books_no")
    @ToString.Exclude
    private Books bookNo;

    // Update
    public Bookclass update(final BookclassRequestDto req, final Optional<Books> book) {
        this.title = req.getTitle();
        this.intro = req.getIntro();
        this.zipCode = req.getZipCode();
        this.location = req.getLocation();
        this.locationDetail = req.getLocationDetail();
        this.memberCnt = req.getMemberCnt();
        this.scheduleStart = req.getScheduleStart();
        this.scheduleEnd = req.getScheduleEnd();
        this.status = ClassStatus.A;
        book.ifPresent(books -> this.bookNo = books);
        return this;
    }

}
