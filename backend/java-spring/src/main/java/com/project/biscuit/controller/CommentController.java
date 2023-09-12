package com.project.biscuit.controller;

import com.project.biscuit.model.Comment;
import com.project.biscuit.model.dto.AddCommentRequest;
import com.project.biscuit.model.dto.CommentResponse;
import com.project.biscuit.model.dto.UpdateCommentRequest;
import com.project.biscuit.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentController {
    private final CommentService commentService;

    // 댓글 저장 (create)
    @PostMapping("/api/comments")
    public ResponseEntity<Comment> addComment(@RequestBody AddCommentRequest request) {
        Comment savedComment = commentService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedComment);
    }

    // 댓글 여러개 가져오기 (read)
    @GetMapping("/api/comments")
    public ResponseEntity<List<CommentResponse>> findallComment() {
        List<CommentResponse> comments = commentService.findAll()
                .stream()
                .map(CommentResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(comments);
    }

    // 댓글 하나 가져오기 (read)
    @GetMapping("/api/comments/{no}")
    public ResponseEntity<CommentResponse> findComment(@PathVariable long no) {
        Comment comment = commentService.findById(no);

        return ResponseEntity.ok()
                .body(new CommentResponse(comment));
    }

    // 댓글 수정하기 (update)
    @PutMapping("/api/comments/{no}")
    public ResponseEntity<Comment> updateComment(@PathVariable long no , @RequestBody UpdateCommentRequest request) {
        Comment updatedComment = commentService.update(no, request);

        return ResponseEntity.ok()
                .body(updatedComment);
    }

    // 글번호 기준 댓글 가져오기 (read)
    @GetMapping("/api/comments/booklogarticles/{no}")
    public ResponseEntity<List<CommentResponse>> findbyBooklogArticleNo(@PathVariable long no) {
        List<CommentResponse> comments = commentService.findByBooklogArticleNo(no)
                .stream()
                .map(CommentResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(comments);
    }

    // 댓글 삭제 ( delete )
    @PutMapping("/api/comments/delete/{no}")
    public void updateCommentDelYn(@PathVariable Long no) {
        commentService.updateCommentDelYn(no);
    }



    // 대댓글
    @GetMapping("/api/comments/{no}/recomments")
    public ResponseEntity<List<CommentResponse>> findbyRecomment(@PathVariable long no) {
        List<CommentResponse> recomments = commentService.findByUpcommentNo(no)
                .stream()
                .map(CommentResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(recomments);
    }

//    // 대댓글 개수 세기
//    @GetMapping("/api/comments/{upcommentNo}/reply-count")
//    public ResponseEntity<Long> getReplyCount(@PathVariable Long upcommentNo) {
//        Long replyCount = commentService.countRepliesByUpcommentNo(upcommentNo);
//        return ResponseEntity.ok(replyCount);
//    }

    @GetMapping("/api/comments/count/{articleNo}")
    public ResponseEntity<Long> getCountComment(@PathVariable Long articleNo) {
        Long countComment = commentService.countByArticleNo(articleNo);
        return ResponseEntity.ok(countComment);
    }


}
