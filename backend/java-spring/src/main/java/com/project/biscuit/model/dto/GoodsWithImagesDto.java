package com.project.biscuit.model.dto;

import com.project.biscuit.model.Goods;
import com.project.biscuit.model.Images;
import lombok.Getter;

@Getter
public class GoodsWithImagesDto {
    private Goods goods;
    private Images images;

    public GoodsWithImagesDto(Goods goods, Images images ) {
        this.goods = goods;
        this.images = images;
    }
}
