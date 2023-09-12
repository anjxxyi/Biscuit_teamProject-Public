package com.project.biscuit.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ClassStatus {
    // 모임상태  A:신청, Y:진행, N:거절, C:취소, E:종료
    A("개설 신청"),
    Y("모집중"),
    N("개설 거절"),
    C("취소됨"),
    E("종료됨");

    private final String cStatus;

}
