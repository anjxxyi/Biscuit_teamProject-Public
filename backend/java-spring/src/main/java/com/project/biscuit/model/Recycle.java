package com.project.biscuit.model;

import com.project.biscuit.model.enums.Status;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Recycle extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '중고 도서 번호'" )
    private Long recycleNo;

    @ManyToOne
    @JoinColumn(name = "User_no")
    @ToString.Exclude
    private User userNo;

    @ManyToOne
    @JoinColumn(name = "books_no")
    @ToString.Exclude
    private Books bookNo;

    @Column(columnDefinition = "bigint comment '판매가격'" , nullable = true)
    private Long salePrice;

    @Column(columnDefinition = "varchar(255) comment '중고 도서 판매 신청 제목'", nullable = false)
    private String title;

    @Column(columnDefinition = "varchar(500) comment '중고 도서 상태 상세 설명'", nullable = false)
    private String content;

    @Column(columnDefinition = "bigint comment '할인율'")
    private Long discountRate;
    
    @Column(columnDefinition = "bigint comment '조회수'" , nullable = true)
    @Builder.Default
    private Long cnt = 0L;


    @Column(columnDefinition = "varchar(1) comment '도서상태 G:Good , N:Normal , B:Bad'" , nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "varchar(1) comment '접수 승인 상태'" , nullable = false)
    @Builder.Default
    private String acceptYn = "N";

    @Column(columnDefinition = "varchar(255) comment '픽업 장소'", nullable = false)
    private String pickupAddress;

    @Column(columnDefinition = "varchar(1) comment '판매여부'")
    @Builder.Default
    private String saleYn = "N";

    //판매여부
    public void updateSaleYn(String saleYn){
        this.saleYn = saleYn;
    }

    //승인여부
    public void updateAccept(String acceptYn, Status status, Long discountRate, Long salePrice){
        this.acceptYn = acceptYn;
        this.status = status;
        this.discountRate = discountRate;
        this.salePrice = salePrice;
    }

}
