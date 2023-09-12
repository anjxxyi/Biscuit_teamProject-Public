package com.project.biscuit.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(callSuper=false)
public class UserSub extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "bigint comment '구독번호'")
    private Long no;

    @ManyToOne
    @JoinColumn(name = "subed_no")  // 구독 대상의 사용자 번호
    private User subedUser;

    @ManyToOne
    @JoinColumn(name = "user_no")  // 구독을 신청한 사용자 번호
    private User user;

    // 해당 메서드를 추가해서 구독 여부 확인
    public boolean isSubscribed(Long userNo, Long subedUserNo) {
        return this.user.getNo().equals(userNo) && this.subedUser.getNo().equals(subedUserNo);
    }
}
