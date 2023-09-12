package com.project.biscuit.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    B("배송 준비"),
    C("주문 취소"),
    D("배송 중"),
    X("상품 B도착"),
    E("주문 완료");

    private final String value;
}
