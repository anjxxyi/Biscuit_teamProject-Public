package com.project.biscuit.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.Images;
import com.project.biscuit.model.Orders;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long no;
    private String merchant_uid;
    private int orderCnt;
    private Long orderPrice;
    private String payment;
    private String status;
    private String statusCode;
    private String phone;
    private String shipAddress;
    private String shipDetail;
    private int shipPost;
    private String shipTo;
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;

    private long gNo;
    private String gContent;
    private String gName;
    private long gPrice;
    private String gImgPath;

    private long rNo;
    private String rTitle;
    private String rContent;
    private int rPrice;
    private long bNo;
    private String bTitle;
    private String bImgUrl;
    private String bIsbn;

    public static OrderResponseDto ofWithRecycle(Orders ord) {
        float rate;
        if(ord.getRecycle().getDiscountRate() == null) rate = 0;
        else rate = (float) ord.getRecycle().getDiscountRate() / 100;

        return OrderResponseDto.builder()
                .no(ord.getNo())
                .merchant_uid(ord.getMerchant_uid())
                .orderCnt(ord.getOrderCnt())
                .orderPrice(ord.getOrderPrice())
                .payment(ord.getPayment())
                .status(ord.getStatus().getValue())
                .statusCode(ord.getStatus().name())
                .phone(ord.getPhone())
                .shipAddress(ord.getShipAddress())
                .shipDetail(ord.getShipDetail())
                .shipPost(ord.getShipPost())
                .shipTo(ord.getShipTo())
                .createdAt(ord.getCreatedAt())
                .updatedAt(ord.getUpdatedAt())

                .rNo(ord.getRecycle().getRecycleNo())
                .rTitle(ord.getRecycle().getTitle())
                .rContent(ord.getRecycle().getContent())
                .rPrice((int) ((1 - rate) * ord.getRecycle().getBookNo().getPrice()))
                .bNo(ord.getRecycle().getBookNo().getNo())
                .bTitle(ord.getRecycle().getBookNo().getTitle())
                .bIsbn(ord.getRecycle().getBookNo().getIsbn())
                .bImgUrl(ord.getRecycle().getBookNo().getBookImgUrl())
                .build();
    }

    public static OrderResponseDto ofWithGoods(Orders ord, Images img) {
        return OrderResponseDto.builder()
                .no(ord.getNo())
                .merchant_uid(ord.getMerchant_uid())
                .orderCnt(ord.getOrderCnt())
                .orderPrice(ord.getOrderPrice())
                .payment(ord.getPayment())
                .status(ord.getStatus().getValue())
                .statusCode(ord.getStatus().name())
                .phone(ord.getPhone())
                .shipAddress(ord.getShipAddress())
                .shipDetail(ord.getShipDetail())
                .shipPost(ord.getShipPost())
                .shipTo(ord.getShipTo())
                .createdAt(ord.getCreatedAt())
                .updatedAt(ord.getUpdatedAt())

                .gNo(ord.getGoods().getNo())
                .gContent(ord.getGoods().getContent())
                .gName(ord.getGoods().getName())
                .gPrice(ord.getGoods().getPrice())
                .gImgPath(img.getImgPath())
                .build();
    }
}
