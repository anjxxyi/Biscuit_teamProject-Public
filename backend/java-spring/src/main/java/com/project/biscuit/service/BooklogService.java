package com.project.biscuit.service;

import com.project.biscuit.model.Booklog;
import com.project.biscuit.model.dto.AddBooklogRequest;
import com.project.biscuit.model.dto.BooklogArticleWithBooklogInfo;
import com.project.biscuit.model.dto.UpdateBooklogRequest;
import com.project.biscuit.repository.BooklogArticleRepository;
import com.project.biscuit.repository.BooklogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BooklogService {

    private final BooklogRepository booklogRepository;
    private final BooklogArticleRepository booklogArticleRepository;

    // 북로그 검색기능 ( 페이지 )
    public List<Booklog> searchBooklogsByNicknameOrUserId(String keyword) {
        return booklogRepository.findByUserNo_NicknameContainingIgnoreCaseOrUserNo_UserIdContainingIgnoreCaseOrderByNoDesc(keyword, keyword);
    }

    // 북로그 생성 (create)
    public Booklog save(AddBooklogRequest request) {
        return booklogRepository.save(request.toEntity());
    }

    // 북로그 목록 보기 (read)
    public List<Booklog> findAll() {
        return booklogRepository.findAll();
    }

    // 북로그 상세 보기 (read)
    public Booklog findByid(long no) {
        return booklogRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));
    }

    // 북로그 수정하기 (update)
    @Transactional
    public Booklog update(long no, UpdateBooklogRequest request) {
        Booklog booklog = booklogRepository.findByUserNo(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));

        booklog.update(request.getBooklog_name(), request.getIntro());

        return booklog;
    }

    //  북로그 번호 기준 게시글들 가져오기 (read)
    public List<BooklogArticleWithBooklogInfo> getArticleAndBooklogInfoForBooklogNo(long no){
        return booklogRepository.getArticleAndBooklogInfoForBooklogNo(no);
    }

    // 북로그 번호로 가져온 게시글 갯수
    public long countArticleAndBooklogInfoForBooklogNo(Long no) {
        return booklogRepository.countArticleAndBooklogInfoForBooklogNo(no);
    }

    // user_no 로 자기 북로그 가져오기
    public Booklog getBooklogByUserId(String userId) {
        Optional<Booklog> optionalBooklog = booklogRepository.findByUserNo_UserId(userId);
        return optionalBooklog.orElse(null);
    }

}

