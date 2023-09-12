package com.project.biscuit.model.enums;

import lombok.Getter;

@Getter
public enum Gender {
    M("남자"),
    F("여자");

    private final String value;
    Gender(String value){
        this.value = value;
    }
}
