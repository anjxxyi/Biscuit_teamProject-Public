package com.project.biscuit.model;

import com.project.biscuit.model.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Orders extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '주문번호'", nullable = false)
    private Long no;

    @Column(columnDefinition = "varchar(100) comment '주문일련번호'", nullable = false)
    private String merchant_uid;

    @Column(columnDefinition = "bigint comment '주문수량'", nullable = false)
    private int orderCnt;

    @Column(columnDefinition = "bigint comment '주문가격'", nullable = false)
    private Long orderPrice;

    @Column(columnDefinition = "varchar(10) comment '결제수단 A:통장 , B:간편결제'", nullable = false)
    private String payment;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private OrderStatus status = OrderStatus.B;
    // B: 배송준비, C: 배송취소, D: 배송 중, E: 배송 완료

    @Column(columnDefinition = "varchar(20) comment '연락처'", nullable = false)
    private String phone;

    @Column(columnDefinition = "varchar(200) comment '배송지주소'", nullable = false)
    private String shipAddress;

    @Column(columnDefinition = "varchar(100) comment '배송지상세'", nullable = false)
    private String shipDetail;

    @Column(columnDefinition = "int(10) comment '우편번호'", nullable = false)
    private int shipPost;

    @Column(columnDefinition = "varchar(100) comment '수령인'", nullable = false)
    private String shipTo;

    // createAt, updateAt

    @OneToOne
    @JoinColumn(name = "Recycle_no")
    @ToString.Exclude
    private Recycle recycle;

    @ManyToOne
    @JoinColumn(name = "Goods_no")
    @ToString.Exclude
    private Goods goods;

    @ManyToOne
    @JoinColumn(name = "User_no", nullable = false)
    @ToString.Exclude
    private User user;

}
