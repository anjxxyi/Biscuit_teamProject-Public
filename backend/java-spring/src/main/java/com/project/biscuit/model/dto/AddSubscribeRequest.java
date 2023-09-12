package com.project.biscuit.model.dto;

public class AddSubscribeRequest {
    private Long userNo;       // 구독을 신청한 사용자 번호
    private Long subedUserNo;  // 구독 대상의 사용자 번호

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public Long getSubedUserNo() {
        return subedUserNo;
    }

    public void setSubedUserNo(Long subedUserNo) {
        this.subedUserNo = subedUserNo;
    }
}
