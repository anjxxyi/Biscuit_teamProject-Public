package com.project.biscuit.model.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.User;
import com.project.biscuit.model.enums.Authority;
import com.project.biscuit.model.enums.Grade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {

    private Long no;
    private String userId;
    private String name;
    private String nickname;
    private String email;
    private String phone;
    private Long point;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate birth;
    private String gender;
    private Grade grade;
    private Authority authority;
    private String address;
    private String address_detail;
    private String zipCode;
    private String quitYn;
    private String provider;
    private String accessToken;     // 접근 토큰
    private Long tokenExpiresIn;    // 토큰 유효기간

    public static UserResponseDto of(User user) {
        return UserResponseDto.builder()
                .no(user.getNo())
                .userId(user.getUserId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .point(user.getPoint())
                .birth(user.getBirth())
                .gender(user.getGender())
                .grade(user.getGrade())
                .authority(user.getAuthority())
                .address(user.getAddress())
                .address_detail(user.getAddress_detail())
                .zipCode(user.getZipCode())
                .quitYn(user.getQuitYn())
                .provider(user.getProvider())
                .accessToken(user.getAccessToken())
                .tokenExpiresIn(user.getAccessTokenExpireIn())
                .build();
    }

    public static UserResponseDto toAdmin(User user) {
        return UserResponseDto.builder()
                .no(user.getNo())
                .userId(user.getUserId())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .point(user.getPoint())
                .birth(user.getBirth())
                .gender(user.getGender())
                .grade(user.getGrade())
                .authority(user.getAuthority())
                .address(user.getAddress())
                .address_detail(user.getAddress_detail())
                .zipCode(user.getZipCode())
                .quitYn(user.getQuitYn())
                .provider(user.getProvider())
                .build();
    }
}
