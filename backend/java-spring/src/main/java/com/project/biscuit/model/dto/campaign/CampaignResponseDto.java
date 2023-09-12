package com.project.biscuit.model.dto.campaign;

import com.project.biscuit.model.Recycle;
import com.project.biscuit.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CampaignResponseDto {
    private Long recycleNo;
    private String title;
    private String content;
    private String pickupAddress;
    private Status status;
    private Long cnt;
    private Long salePrice;
    private String acceptYn;
    private String publisher;
    private String saleYn;
    private Long bookPrice; // 원래 도서 가격
    private Long discountRate; //할인율
    private String userId;
    private String bookName;
    private String bookAuthor;
    private String bookDetail;
    private String bookIsbn;
    private String bookImgUrl;
    private String authorDetail;
    private String translator;
    private String transDetail;
    private LocalDateTime updatedAt;



    public static CampaignResponseDto of(Recycle recycle) {
        return CampaignResponseDto.builder()
                .recycleNo(recycle.getRecycleNo())
                .title(recycle.getTitle())
                .content(recycle.getContent())
                .pickupAddress(recycle.getPickupAddress())
                .status(recycle.getStatus())
                .cnt(recycle.getCnt())
                .salePrice(recycle.getSalePrice())
                .acceptYn(recycle.getAcceptYn())
                .saleYn(recycle.getSaleYn())
                .bookPrice(recycle.getBookNo().getPrice())
                .discountRate(recycle.getDiscountRate())
                .publisher(recycle.getBookNo().getPublisher())
                .userId(recycle.getUserNo().getUserId())
                .bookName(recycle.getBookNo().getTitle())
                .bookAuthor(recycle.getBookNo().getAuthor())
                .bookDetail(recycle.getBookNo().getDetail())
                .bookIsbn(recycle.getBookNo().getIsbn())
                .authorDetail(recycle.getBookNo().getAuthorDetail())
                .translator(recycle.getBookNo().getTranslator())
                .transDetail(recycle.getBookNo().getTransDetail())
                .bookImgUrl(recycle.getBookNo().getBookImgUrl())
                .updatedAt(recycle.getUpdatedAt())
                .build();
    }

    public CampaignResponseDto (Recycle recycle){
        this.recycleNo = recycle.getRecycleNo();
        this.title = recycle.getTitle();
        this.content = recycle.getContent();
        this.pickupAddress = recycle.getPickupAddress();
        this.status = recycle.getStatus();
        this.cnt = recycle.getCnt();
        this.salePrice = recycle.getSalePrice();
        this.acceptYn = recycle.getAcceptYn();
        this.saleYn = recycle.getSaleYn();
        this.publisher = recycle.getBookNo().getPublisher();
        this.bookPrice = recycle.getBookNo().getPrice();
        this.discountRate = recycle.getDiscountRate();
        this.userId = recycle.getUserNo().getUserId();
        this.bookName = recycle.getBookNo().getTitle();
        this.bookAuthor = recycle.getBookNo().getAuthor();
        this.bookDetail = recycle.getBookNo().getDetail();
        this.authorDetail = recycle.getBookNo().getAuthorDetail();
        this.translator = recycle.getBookNo().getTranslator();
        this.transDetail = recycle.getBookNo().getTransDetail();
        this.bookIsbn = recycle.getBookNo().getIsbn();
        this.bookImgUrl = recycle.getBookNo().getBookImgUrl();
        this.updatedAt = recycle.getUpdatedAt();
    }
}
