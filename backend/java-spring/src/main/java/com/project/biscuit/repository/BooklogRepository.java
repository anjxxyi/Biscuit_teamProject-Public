package com.project.biscuit.repository;

import com.project.biscuit.model.Booklog;
import com.project.biscuit.model.dto.BooklogArticleWithBooklogInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BooklogRepository extends JpaRepository<Booklog , Long> {

    // 북로그 번호로 게시글 리스트 찾기 ( read )
    @Query("SELECT new com.project.biscuit.model.dto.BooklogArticleWithBooklogInfo(a, b) " +
            "FROM BooklogArticle a " +
            "JOIN a.booklog b " +
            "WHERE b.no = :no")
    List<BooklogArticleWithBooklogInfo> getArticleAndBooklogInfoForBooklogNo(@Param("no") Long no);

    // 북로그 번호로 가져온 게시글 갯수
    @Query("SELECT COUNT(a) " +
            "FROM BooklogArticle a " +
            "JOIN a.booklog b " +
            "WHERE b.no = :no")
    long countArticleAndBooklogInfoForBooklogNo(@Param("no") Long no);

    // user_no 로 자기 북로그 가져오기
    Optional<Booklog> findByUserNo(Long userNo);

    // userId 로 자기 북로그 가져오기
    Optional<Booklog> findByUserNo_UserId(String userId);

    @Query("SELECT b FROM Booklog b ORDER BY b.no DESC")
    List<Booklog> findAll();

    List<Booklog> findByUserNo_NicknameContainingIgnoreCaseOrUserNo_UserIdContainingIgnoreCaseOrderByNoDesc(String nicknameKeyword, String useridKeyword);

}
