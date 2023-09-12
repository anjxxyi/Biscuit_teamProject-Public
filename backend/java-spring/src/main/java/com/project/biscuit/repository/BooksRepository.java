package com.project.biscuit.repository;

import com.project.biscuit.model.Books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BooksRepository extends JpaRepository<Books, Long> {
    Optional<Books> findByIsbn(String isbn);

    // 북로그 게시글 에서 책 검색하기
    List<Books> findByTitleContaining(String title);
}
