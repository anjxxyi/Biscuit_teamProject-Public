package com.project.biscuit.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Authority {

    A("A", "관리자"),
    U("U","일반 회원");

    private final String key;
    private final String value;
}