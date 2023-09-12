package com.project.biscuit.model.dto;

import com.project.biscuit.model.Images;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateGoodsRequest {
    private String name;
    private Long price;
    private String content;
    private Long likes;
    private Images images_no;
    private String sale_yn;
    private Long inventory;

}
