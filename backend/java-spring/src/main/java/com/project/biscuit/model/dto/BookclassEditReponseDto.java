package com.project.biscuit.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.Bookclass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookclassEditReponseDto {
    private Long no;
    private String title;
    private String intro;
    private String location;
    private String locationDetail;
    private String zipCode;
    private String status;
    private int memberCnt;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime schedule;
    @JsonFormat(pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime scheduleStart;
    @JsonFormat(pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime scheduleEnd;
    private String userNickname;
    private String bookTitle;
    private String bookAuthor;
    private String bookDetail;
    private String bookIsbn;
    private String bookPublisher;
    private String bookImgUrl;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;

    public static BookclassEditReponseDto of(Bookclass bookclass) {
        return BookclassEditReponseDto.builder()
            .no(bookclass.getNo())
            .title(bookclass.getTitle())
            .intro(bookclass.getIntro())
            .location(bookclass.getLocation())
            .locationDetail(bookclass.getLocationDetail())
            .zipCode(bookclass.getZipCode())
            .schedule(bookclass.getScheduleStart())
            .scheduleStart(bookclass.getScheduleStart())
            .scheduleEnd(bookclass.getScheduleEnd())
            .status(bookclass.getStatus().getCStatus())
            .memberCnt(bookclass.getMemberCnt())
            .userNickname(bookclass.getUserNo().getNickname())
            .bookTitle(bookclass.getBookNo().getTitle())
            .bookAuthor(bookclass.getBookNo().getAuthor())
            .bookDetail(bookclass.getBookNo().getDetail())
            .bookIsbn(bookclass.getBookNo().getIsbn())
            .bookPublisher(bookclass.getBookNo().getPublisher())
            .bookImgUrl(bookclass.getBookNo().getBookImgUrl())
            .createdAt(bookclass.getCreatedAt())
            .updatedAt(bookclass.getUpdatedAt())
            .build();
    }
}
