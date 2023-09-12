package com.project.biscuit.model.dto;

import com.project.biscuit.model.Goods;
import com.project.biscuit.model.Images;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoodsResponse {
    private Long no;
    private String content;
    private Long likes;
    private String name;
    private Long price;
    private String sale_yn;
    private Long inventory;
    private Images images_no;


    public GoodsResponse(Goods goods) {
        this.no = goods.getNo();
        this.content = goods.getContent();
        this.likes = goods.getLikes();
        this.name = goods.getName();
        this.price = goods.getPrice();
        this.sale_yn = goods.getSale_yn();
        this.inventory = goods.getInventory();
        this.images_no = goods.getImages();
    }

}
