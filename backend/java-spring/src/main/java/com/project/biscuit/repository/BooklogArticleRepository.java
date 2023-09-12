package com.project.biscuit.repository;

import com.project.biscuit.model.BooklogArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BooklogArticleRepository extends JpaRepository<BooklogArticle, Long> {

    // user_no 기준 데이터
    List<BooklogArticle> findByUserNo(Long userNo);

    // groups 별 user_no 기준 북로그 게시글
    List<BooklogArticle> findByGroupsAndUserNo(String groups, Long userNo);

    // createAt 순 북로그 게시글 리스트
    @Query("SELECT b FROM BooklogArticle b ORDER BY b.createdAt DESC ")
    List<BooklogArticle> findAll();

    @Query("SELECT b FROM BooklogArticle b ORDER BY b.createdAt DESC")
    Page<BooklogArticle> findAll(Pageable pageable);

    List<BooklogArticle> findByTitleContainingOrContentContainingOrderByCreatedAtDesc(String titleKeyword, String contentKeyword);
}
