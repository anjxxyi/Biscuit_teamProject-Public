package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '이미지번호'")

    private Long no;

    @Column(columnDefinition = "varchar(40) comment '이미지이름'")
    private String imgName;

    @Column(columnDefinition = "varchar(100) comment '이미지타입'")
    private String type;

    @Column(columnDefinition = "varchar(150) comment '이미지경로'")
    private String imgPath;

    @Lob
    @Column(name = "imagedata", length = 1000)
    private byte[] imageData;

    @Column(columnDefinition = "varchar(1) comment '썸네일여부'")
    private String thumbnailYn;


    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Goods goods;

    public Images(Long no) {
        this.no = no;
    }
}
