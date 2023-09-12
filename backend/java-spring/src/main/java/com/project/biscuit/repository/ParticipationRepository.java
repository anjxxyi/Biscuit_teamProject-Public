package com.project.biscuit.repository;

import com.project.biscuit.model.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    
    // 이벤트 별 참여자 리스트
    List<Participation> findByEventNo(Long no);

    // 특정 이벤트에 대한 특정 사용자의 참여 정보 삭제
    void deleteByEventNoAndUserNo(Long eventNo, Long userNo);
}
