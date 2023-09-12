package com.project.biscuit.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBooklogArticleRequest {
    private String title;
    private String content;
    private String groups;
    private String kinds;
    private Long books_no;

}
