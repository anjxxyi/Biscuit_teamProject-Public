package com.project.biscuit.model.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.biscuit.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSignupRequestDto {

    @Size(min = 8, max = 16)
    private String userId;
    @Size(min = 8, max = 16)
    private String password;

    private String name;

    @Size(min = 2, max = 8)
    private String nickname;
    private String phone;
    @Email
    private String email;
    
    private String gender;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
    private LocalDate birth;

    private String zipCode;
    private String address;
    private String address_detail;


    public User toUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .userId(userId)
                .password(passwordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .phone(phone)
                .email(email)
                .gender(gender)
                .birth(birth)
                .zipCode(zipCode)
                .address(address)
                .address_detail(address_detail)
                .build();
    }

    public UserResponseDto toUserResponseDto(UserSignupRequestDto userSignupRequestDto){
        return UserResponseDto.builder()
                .userId(userId)
                .nickname(nickname)
                .build();
    }





    /* admin user add */
    public User toEntity() {

        return User.builder()
                .userId(userId)
                .password(password)
                .name(name)
                .nickname(nickname)
                .phone(phone)
                .email(email)
                .gender(gender)
                .birth(birth)
                .address(address)
                .address_detail(address_detail)
                .build();
    }

}