package com.project.biscuit.controller;

import com.project.biscuit.model.BooklogArticle;
import com.project.biscuit.model.User;
import com.project.biscuit.service.BooklogArticleService;
import com.project.biscuit.service.GonggamService;
import com.project.biscuit.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gonggam")
public class GonggamController {
    private final GonggamService gonggamService;
    private final UserService userService;
    private final BooklogArticleService booklogArticleService;

    @Transactional
    @PostMapping("/add")
    public ResponseEntity<String> addGonggam(
            @RequestParam Long userId,
            @RequestParam Long articleId
    ) {
        User user = userService.getUserByNo(userId);
        BooklogArticle article = booklogArticleService.findById(articleId);

        if (user == null || article == null) {
            return ResponseEntity.badRequest().body("Invalid user or article ID");
        }

        gonggamService.addGonggam(user, article);

        // BooklogArticle의 likes 값을 +1 업데이트
        article.setLikes(article.getLikes() + 1);
        booklogArticleService.saveLikes(article); // 업데이트된 값을 저장

        return ResponseEntity.ok("Gonggam added successfully");
    }

    @Transactional
    @PostMapping("/remove")
    public ResponseEntity<String> removeGonggam(
            @RequestParam Long userId,
            @RequestParam Long articleId
    ) {
        User user = userService.getUserByNo(userId);
        BooklogArticle article = booklogArticleService.findById(articleId);

        if (user == null || article == null) {
            return ResponseEntity.badRequest().body("Invalid user or article ID");
        }

        gonggamService.removeGonggam(user, article);

        if (article.getLikes() > 0) {
            article.setLikes(article.getLikes() - 1); // 좋아요 수 감소
            booklogArticleService.saveLikes(article); // 업데이트된 값을 저장
        }
        return ResponseEntity.ok("Gonggam removed successfully");
    }

    // 좋아요 상태 여부
    @GetMapping("/check")
    public ResponseEntity<CheckResponse> checkGonggam(
            @RequestParam Long userId,
            @RequestParam Long articleId
    ) {
        User user = userService.getUserByNo(userId);
        BooklogArticle article = booklogArticleService.findById(articleId);

        if (user == null || article == null) {
            return ResponseEntity.badRequest().build();
        }

        boolean isLiked = gonggamService.isGonggamed(user, article);

        CheckResponse response = new CheckResponse(isLiked);

        return ResponseEntity.ok(response);
    }

    private static class CheckResponse {
        private final boolean isLiked;

        public CheckResponse(boolean isLiked) {
            this.isLiked = isLiked;
        }

        public boolean isLiked() {
            return isLiked;
        }
    }



}
