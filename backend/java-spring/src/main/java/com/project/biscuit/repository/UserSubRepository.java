package com.project.biscuit.repository;

import com.project.biscuit.model.UserSub;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSubRepository extends JpaRepository<UserSub,Long> {
    List<UserSub> findByUserNo(Long userNo);          // 특정 사용자의 구독 정보 조회
    List<UserSub> findBySubedUserNo(Long subedUserNo); // 특정 사용자를 구독한 정보 조회
//    List<UserSub> findByUserNoAndSubedUserNo(Long userNo, Long subedUserNo); // 구독 여부 확인

    // 구독 하기
    boolean existsByUserNoAndSubedUserNo(Long userNo, Long subedUserNo);

    // 구독 취소
    UserSub findByUserNoAndSubedUserNo(Long userNo, Long subedUserNo);
}
