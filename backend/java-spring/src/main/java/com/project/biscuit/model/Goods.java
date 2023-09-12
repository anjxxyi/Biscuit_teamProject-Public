package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(callSuper=false)
public class Goods {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '굿즈번호'")
    private Long no;

    @Column(columnDefinition = "varchar(100) comment '굿즈이름'")
    private String name;

    @Column(columnDefinition = "bigint comment '굿즈가격'")
    private Long price;

    @Column(columnDefinition = "text comment '굿즈설명'")
    private String content;

    @Column(columnDefinition = "bigint comment '찜하기'")
    @Builder.Default
    private Long likes = 0L;

    @Column(columnDefinition = "varchar(1) comment '판매상태'" , nullable = false)
    private String sale_yn;

    @Column(columnDefinition = "bigint comment '재고수량'")
    private Long inventory;

    @ManyToOne
    @ToString.Exclude
    private Images images;


    public void update(String name,
                       Long price,
                       String content,
                       Long likes,
                       Images imagesNo,
                       String sale_yn,
                       Long inventory) {
        this.name = name;
        this.price = price;
        this.content = content;
        this.likes = likes;
        this.sale_yn = sale_yn;
        this.inventory= inventory;
        this.images = imagesNo;
    }

    public void updateInventory(Long no){
        this.inventory = inventory - 1;
    }

}