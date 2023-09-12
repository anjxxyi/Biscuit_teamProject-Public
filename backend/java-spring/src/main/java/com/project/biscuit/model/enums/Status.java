package com.project.biscuit.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    S("S", "도서상태 최상"),
    G("G", "도서상태 좋음"),
    N("N", "도서상태 나쁘지않음"),
    B("B", "도서상태 나쁨");

    private final String key;
    private final String value;
}
