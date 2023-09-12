package com.project.biscuit.controller;

import com.project.biscuit.model.Booklog;
import com.project.biscuit.model.BooklogArticle;
import com.project.biscuit.model.Books;
import com.project.biscuit.model.dto.*;
import com.project.biscuit.service.BooklogArticleService;
import com.project.biscuit.service.BooklogService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BooklogApiController {

    private final BooklogArticleService booklogArticleService;

    private final BooklogService booklogService;

    // 북로그 검색 기능 ( 페이지 )
    @GetMapping("/api/booklogs/search")
    public ResponseEntity<List<Booklog>> searchBooklogsByNicknameOrUserId(
            @RequestParam String keyword) {
        List<Booklog> searchResults = booklogService.searchBooklogsByNicknameOrUserId(keyword);
        return ResponseEntity.ok(searchResults);
    }

    // 북로그 게시글 검색 기능 ( 페이지 )
    @GetMapping("/api/booklogarticles/search")
    public ResponseEntity<List<BooklogArticle>> searchArticles(
            @RequestParam String keyword) {
        List<BooklogArticle> searchResult = booklogArticleService.searchArticles(keyword);

        return ResponseEntity.ok(searchResult);
    }


    // 북로그 게시글 저장 (create)
    @PostMapping("/api/booklogarticles/new/{user_no}")
    public ResponseEntity<BooklogArticle> addBooklogArticle(@RequestBody AddBooklogArticleRequest request , @PathVariable long user_no) throws NotFoundException {

        request.setUser_no(user_no);

        BooklogArticle savedBooklogArticle = booklogArticleService.save(request);

        // 요청한 자원이 성공적으로 생성되었고, 저장된 블로그 글 정보를 응답 객체에 담아서 전송
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBooklogArticle);
    }

    // user_no 기준 게시글 가져오기
    @GetMapping("/api/booklogarticles/user/{userNo}")
    public List<BooklogArticle> getArticlesByUserNo(@PathVariable Long userNo) {
        return booklogArticleService.getArticlesByUserNo(userNo);
    }

    
    // 북로그 게시글에 올릴 책들 가져오기
    @GetMapping("/api/booklogarticles/books")
    public ResponseEntity<List<Books>> findBooksAll() {
        List<Books> books = booklogArticleService.findBooksAll();

        return ResponseEntity.ok()
                .body(books);
    }

    // 북로그 게시글에서 책 검색하기
    @GetMapping("/api/booklogarticles/books/search")
    public ResponseEntity<List<Books>> searchBooksByTitle(@RequestParam String title) {
        List<Books> books = booklogArticleService.searchBooksByTitle(title);
        return ResponseEntity.ok()
                .body(books);
    }
    
    
    // 북로그 게시글 리스트 (read)
    @GetMapping("/api/booklogarticles")
    public ResponseEntity<List<BooklogArticleResponse>> findAllBooklogArticles() {
        List<BooklogArticleResponse> booklogArticles = booklogArticleService.findAll()
                .stream()
                .map(BooklogArticleResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(booklogArticles);
    }

    // 북로그 게시글 리스트 페이지 나누기 (read)
    @GetMapping("/api/paginate/booklogarticles")
    public ResponseEntity<Page<BooklogArticleResponse>> findAllBooklogArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BooklogArticleResponse> booklogArticles = booklogArticleService.findAll(pageable)
                .map(BooklogArticleResponse::new);

        return ResponseEntity.ok()
                .body(booklogArticles);
    }

    // 북로그 No 값으로 게시글 출력 (read)
    @GetMapping("/api/booklogarticles/{no}")
    public ResponseEntity<BooklogArticleResponse> findBooklogArticle(@PathVariable long no) {
        BooklogArticle booklogArticle = booklogArticleService.findById(no);

        return ResponseEntity.ok()
                .body(new BooklogArticleResponse(booklogArticle));
    }

    // 북로그 게시글 수정하기 (update)
    @PutMapping("/api/booklogarticles/{no}")
    public ResponseEntity<BooklogArticle> updateBooklogArticle(
            @PathVariable long no,
            @RequestBody UpdateBooklogArticleRequest request
            ) {
        BooklogArticle updatedBooklogArticle = booklogArticleService.update(no, request);

        return ResponseEntity.ok()
                .body(updatedBooklogArticle);
    }

    // ---------------------------------------------------------------------------------------------

    // 북로그 생성 (create)
    @PostMapping(path = "/api/booklogs", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Booklog> addBooklog(@RequestBody AddBooklogRequest request) {
        Booklog savedBooklog = booklogService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBooklog);
    }

    // 북로그 목록 보기 (read)
    @GetMapping("/api/booklogs")
    public ResponseEntity<List<BooklogResponse>> findAllBooklog() {
        List<BooklogResponse> booklogs = booklogService.findAll()
                .stream()
                .map(BooklogResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(booklogs);
    }

//    // 북로그 상세 보기 (read)
//    @GetMapping("/api/booklogs/{no}")
//    public ResponseEntity<BooklogResponse> findBooklog(@PathVariable long no) {
//        Booklog booklog = booklogService.findByid(no);
//
//        return ResponseEntity.ok()
//                .body(new BooklogResponse(booklog));
//    }

    // [ user_no 기준으로 ]북로그 상세 보기 (read)
    @GetMapping("/api/booklogs/{userId}")
    public ResponseEntity<BooklogResponse> findBooklog(@PathVariable String userId) {
        Booklog booklog = booklogService.getBooklogByUserId(userId);

        return ResponseEntity.ok()
                .body(new BooklogResponse(booklog));
    }


    // 북로그 수정하기 (update)
    @PutMapping("/api/booklogs/{no}")
    public ResponseEntity<Booklog> updateBooklog(@PathVariable long no,
                                                 @RequestBody UpdateBooklogRequest request) {
        Booklog updatedBooklog = booklogService.update(no, request);

        return ResponseEntity.ok()
                .body(updatedBooklog);
    }

    // 북로그 번호 기준 게시글들 가져오기 (read)
    @GetMapping("/api/mybooklog/{no}")
    public ResponseEntity<List<BooklogArticleWithBooklogInfo>> getArticleAndBooklogInfoForBooklogNo(@PathVariable long no) {

        List<BooklogArticleWithBooklogInfo> articlesWithBooklogInfo = booklogService.getArticleAndBooklogInfoForBooklogNo(no)
                .stream()
                .map(result -> new BooklogArticleWithBooklogInfo(result.getArticle(), result.getBooklog()))
                .toList();

        return ResponseEntity.ok()
                .body(articlesWithBooklogInfo);
    }

    // 북로그 번호로 가져온 게시글 갯수
    @GetMapping("/api/mybooklog/{booklogNo}/article/count")
    public ResponseEntity<Long> countArticleAndBooklogInfoForBooklogNo(@PathVariable Long booklogNo) {
        long articleCount = booklogService.countArticleAndBooklogInfoForBooklogNo(booklogNo);
        return ResponseEntity.ok(articleCount);
    }

    // groups 별 user_no 기준 북로그 게시글
    @GetMapping("/api/mybooklog/articles/groups")
    public List<BooklogArticle> getArticlesByGroupsAndUserNo(
            @RequestParam String groups,
            @RequestParam Long userNo
    ) {
        return booklogArticleService.getArticlesByGroupsAndUserNo(groups, userNo);
    }

    @GetMapping("/api/mybooklog/delete/{no}")
    public String delMyBooklog(@PathVariable Long no) {
        return booklogArticleService.delMyBookLog(no);
    }


}
