package com.project.biscuit.repository;

import com.project.biscuit.model.Bookclass;
import com.project.biscuit.model.enums.ClassStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookclassRepository extends JpaRepository<Bookclass, Long> {
    List<Bookclass> findByTitleContaining(String keyword);
    List<Bookclass> findByUserNo_NicknameContaining(String keyword);

    // 생성 순으로 사용자별 목록 가져오기
    List<Bookclass> findByUserNo_NoOrderByCreatedAtDesc(long userNo);

    // 클래스 시작일이 가까운 순으로 가져오기
    List<Bookclass> findByStatusOrderByScheduleStart(ClassStatus cs);

    // 클래스 상태별 최신 순으로 가져오기
    List<Bookclass> findByStatusOrderByUpdatedAtDesc(ClassStatus cs);

    // 최신순으로 전체 목록 가져오기
    List<Bookclass> findAllByOrderByUpdatedAtDesc();

}
