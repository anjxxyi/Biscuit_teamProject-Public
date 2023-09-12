package com.project.biscuit.repository;

import com.project.biscuit.model.BookclassMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookclassMemberRepository extends JpaRepository<BookclassMember, Long> {

    // 북클래스 번호, 사용자 번호로 데이터 있는지 확인
    boolean existsByBookclass_NoAndUser_No(Long bkcNo, Long userNo);


    // 북클래스 번호, 사용자 번호로 목록 가져오기
    Optional<BookclassMember> findByBookclass_NoAndUser_No(Long bkcNo, Long userNo);

    // 북클래스 번호 기준으로 목록 가져오기
    List<BookclassMember> findByBookclass_No(long bkcNo);

    // 사용자 번호 기준으로 목록 가져오기
    List<BookclassMember> findByUser_NoOrderByCreatedAtDesc(long userNo);

    // 북클래스 참여자 수 가져오기
    Long countByBookclassNo(Long no);
}
