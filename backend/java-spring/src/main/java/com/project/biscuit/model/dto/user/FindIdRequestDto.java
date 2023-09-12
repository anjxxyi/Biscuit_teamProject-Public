package com.project.biscuit.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindIdRequestDto {

    private String name;
    private LocalDate birth;
    private String phone;
}
