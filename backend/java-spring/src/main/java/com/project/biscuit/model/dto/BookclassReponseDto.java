package com.project.biscuit.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.Bookclass;
import com.project.biscuit.model.BookclassMember;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BookclassReponseDto {
    // 모임상태  A:신청, Y:진행, N:거절, C:취소, E:종료
    private final Long no;
    private final String title;
    private final String intro;
    private final String location;
    private final String locationDetail;
    private final String status;
    private final String statusCode;
    private final int memberCnt;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
    private final LocalDateTime scheduleStart;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
    private final LocalDateTime scheduleEnd;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
    private final LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy.MM.dd HH:mm", timezone = "Asia/Seoul")
    private final LocalDateTime updatedAt;

    private final String leaderNickname;

    private final Long bookNo;
    private final String bookTitle;
    private final String bookAuthor;
    private final String bookDetail;
    private final String bookIsbn;
    private final String bookImgUrl;

    private final Long userNo;
    private final String userId;

    private final long partyMemCnt;
    private final boolean joined;


    public BookclassReponseDto(final Bookclass bookclass, final boolean joined , final Long partyMemCnt){
        this.no = bookclass.getNo();
        this.title = bookclass.getTitle();
        this.intro = bookclass.getIntro();
        this.location = bookclass.getLocation();
        this.locationDetail = bookclass.getLocationDetail();
        this.status = bookclass.getStatus().getCStatus();
        this.statusCode = bookclass.getStatus().name();
        this.memberCnt = bookclass.getMemberCnt();
        this.scheduleStart = bookclass.getScheduleStart();
        this.scheduleEnd = bookclass.getScheduleEnd();
        this.createdAt = bookclass.getCreatedAt();
        this.updatedAt = bookclass.getUpdatedAt();

        this.leaderNickname = bookclass.getUserNo().getNickname();

        this.bookNo = bookclass.getBookNo().getNo();
        this.bookTitle = bookclass.getBookNo().getTitle();
        this.bookAuthor = bookclass.getBookNo().getAuthor();
        this.bookDetail = bookclass.getBookNo().getDetail();
        this.bookIsbn = bookclass.getBookNo().getIsbn();
        this.bookImgUrl = bookclass.getBookNo().getBookImgUrl();

        this.userNo = bookclass.getUserNo().getNo();
        this.userId = bookclass.getUserNo().getUserId();

        this.partyMemCnt = partyMemCnt;
        this.joined = joined;
    }

    public BookclassReponseDto(final BookclassMember bkcm, final boolean joined , final Long partyMemCnt){
        this.no =  bkcm.getBookclass().getNo();
        this.title =  bkcm.getBookclass().getTitle();
        this.intro =  bkcm.getBookclass().getIntro();
        this.location =  bkcm.getBookclass().getLocation();
        this.locationDetail =  bkcm.getBookclass().getLocationDetail();
        this.status =  bkcm.getBookclass().getStatus().getCStatus();
        this.statusCode = bkcm.getBookclass().getStatus().name();
        this.memberCnt =  bkcm.getBookclass().getMemberCnt();
        this.scheduleStart =  bkcm.getBookclass().getScheduleStart();
        this.scheduleEnd =  bkcm.getBookclass().getScheduleEnd();
        this.createdAt =  bkcm.getBookclass().getCreatedAt();
        this.updatedAt =  bkcm.getBookclass().getUpdatedAt();

        this.leaderNickname =  bkcm.getBookclass().getUserNo().getNickname();

        this.bookNo =  bkcm.getBookclass().getBookNo().getNo();
        this.bookTitle =  bkcm.getBookclass().getBookNo().getTitle();
        this.bookAuthor =  bkcm.getBookclass().getBookNo().getAuthor();
        this.bookDetail =  bkcm.getBookclass().getBookNo().getDetail();
        this.bookIsbn =  bkcm.getBookclass().getBookNo().getIsbn();
        this.bookImgUrl =  bkcm.getBookclass().getBookNo().getBookImgUrl();

        this.userNo =  bkcm.getUser().getNo();
        this.userId =  bkcm.getUser().getUserId();

        this.partyMemCnt = partyMemCnt;
        this.joined = joined;
    }

}
