package com.project.biscuit.model.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserPasswordUpdateDto {
    private Long no;
    private String password;

    @Builder
    public UserPasswordUpdateDto(Long no, String password){
        this.no = no;  this.password = password;
    }
    public UserPasswordUpdateDto() {
        // 기본 생성자
    }
}
