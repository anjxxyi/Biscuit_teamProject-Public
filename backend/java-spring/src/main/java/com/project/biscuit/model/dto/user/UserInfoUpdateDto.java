package com.project.biscuit.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
public class UserInfoUpdateDto {
    private final Long no;
    private final String name;
    private final String phone;
    private final String email;
    private final String nickname;
    private final String zipCode;
    private final String address;

    private final String address_detail;

}
