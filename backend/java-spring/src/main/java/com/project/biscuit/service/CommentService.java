package com.project.biscuit.service;

import com.project.biscuit.model.Comment;
import com.project.biscuit.model.dto.AddCommentRequest;
import com.project.biscuit.model.dto.UpdateCommentRequest;
import com.project.biscuit.repository.CommentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;

    // 댓글 작성 (create)
    public Comment save(AddCommentRequest request) {
        return commentRepository.save(request.toEntity());
    }

    // 댓글 전체 가져오기 (read)
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    // 댓글 하나 가져오기 (read)
    public Comment findById(long no) {
        return commentRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));
    }

    // 댓글 삭제하기 ( delete)
    public void updateCommentDelYn(Long no) {
        commentRepository.updateDelYnByNo(no);
    }

    // 글번호 기준 댓글 가져오기 (read)
    public List<Comment> findByBooklogArticleNo(long no) {
        return commentRepository.findByBooklogArticle_No(no);
    }

    // 대댓글 가져오기 (read)
    public List<Comment> findByUpcommentNo(long no) {
        return commentRepository.findByUpcommentNo(no);
    }

    // 댓글 수정하기 (update)
    @Transactional
    public Comment update(long no , UpdateCommentRequest request) {
        Comment comment = commentRepository.findById(no)
                .orElseThrow(() -> new IllegalArgumentException(no + " : 를 찾을수 없습니다."));

        comment.update(request.getContent());

        return comment;
    }

//    // 대댓글 갯수 세기
//    public Long countRepliesByUpcommentNo(Long upcommentNo) {
//        return commentRepository.countByUpcommentNo(upcommentNo);
//    }

    // 댓글 + 대댓글 갯수
    public Long countByArticleNo(Long articleNo){
        return commentRepository.countByBooklogArticle_NoAndDelYn(articleNo, "N");
    }

}
