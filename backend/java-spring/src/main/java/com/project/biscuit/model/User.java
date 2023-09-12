package com.project.biscuit.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.biscuit.model.enums.Authority;
import com.project.biscuit.model.enums.Grade;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity


public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '고객번호'" )
    private Long no;

    @Column(columnDefinition = "varchar(30) comment '유저아이디'" , nullable = false , unique = true)
    private String userId;

    @Column(columnDefinition = "varchar(200) comment '비밀번호'" , nullable = false)
    private String password;

    private String accessToken;
    private Long accessTokenExpireIn;


    @Column(columnDefinition = "varchar(30) comment '이름'" , nullable = false)
    private String name;

    @Column(columnDefinition = "varchar(30) comment '닉네임'" , nullable = false , unique = true)
    private String nickname;

    @Column(columnDefinition = "varchar(30) comment '핸드폰번호'" , nullable = false , unique = true)
    private String phone;

    @Column(columnDefinition = "varchar(100) comment '이메일'" , nullable = false , unique = true)
    private String email;

    @Column(columnDefinition = "datetime(6) comment '생년월일'" , nullable = false)
    private LocalDate birth;

    @Column(columnDefinition = "varchar(6) comment '우편번호'", nullable = false)
    private String zipCode;

    @Column(columnDefinition = "varchar(60) comment '주소'" , nullable = false)
    private String address;

    @Column(columnDefinition = "varchar(60) comment '상세주소'" , nullable = false)
    private String address_detail;

    @Column(columnDefinition = "varchar(1) comment '성별'" , nullable = false)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Grade grade = Grade.valueOf("M");

    @Column(columnDefinition = "bigint comment '리워드 포인트'" , nullable = false)
    @Builder.Default
    @JsonIgnoreProperties(ignoreUnknown = true)
    private Long point = 0L;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Authority authority = Authority.valueOf("U");


    private String provider;

//  createdAt;
//  updatedAt;

    @Column(columnDefinition = "datetime(6) DEFAULT now() comment '탈퇴일'")
    private LocalDate expiredAt;

    @Column(columnDefinition = "varchar(1) comment '탈퇴여부'")
    @Builder.Default
    private String quitYn = "N";

    public User update(String userId, String nickname){
        this.userId = userId;
        this.nickname = nickname;
        return this;
    }


    public User update(
            String accessToken,
            Long accessTokenExpireIn,
            String email
    ) {
        this.accessToken = accessToken;
        this.accessTokenExpireIn = accessTokenExpireIn;
        this.email = email;
        return this;
    }

    public User updateUser(String phone,
                           String email,
                           String nickname,
                           String zipCode,
                           String address,
                           String address_detail){

        this.phone = phone;
        this.email = email;
        this.nickname = nickname;
        this.zipCode = zipCode;
        this.address = address;
        this.address_detail = address_detail;
        return this;
    }

    public void updatePassword(String password){
        this.password = password;
    }

    public String userQuit(String quitYn) {
        this.quitYn = quitYn;
        return quitYn;
    }

}

