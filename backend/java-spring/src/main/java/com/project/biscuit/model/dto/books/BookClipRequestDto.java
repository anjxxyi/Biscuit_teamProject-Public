package com.project.biscuit.model.dto.books;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookClipRequestDto {
    private long clipNo;

    private long bookNo;
    private long userNo;
    private int sortNum;
}
