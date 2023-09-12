package com.project.biscuit.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BkclassMemReqDto {
    private long bookclassNo;
    private long userNo;
    private int sortNum;

}

