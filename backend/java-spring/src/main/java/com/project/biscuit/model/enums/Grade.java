package com.project.biscuit.model.enums;

import lombok.Getter;

@Getter
public enum Grade {
    L("L","클래스 리더"),
    M("M","클래스 멤버");

    private final String key;
    private final String value;
    Grade(String key, String value){
        this.key = key;
        this.value = value;
    }

}