package com.project.biscuit.repository;

import com.project.biscuit.model.BooklogArticle;
import com.project.biscuit.model.Gonggam;
import com.project.biscuit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GonggamRepository extends JpaRepository <Gonggam , Long> {
    // 사용자와 게시물로 좋아요 삭제
    void deleteByUserAndBooklogArticle(User user, BooklogArticle article);

    // 좋아요 상태 여부
    boolean existsByUserAndBooklogArticle(User user, BooklogArticle article);

}
