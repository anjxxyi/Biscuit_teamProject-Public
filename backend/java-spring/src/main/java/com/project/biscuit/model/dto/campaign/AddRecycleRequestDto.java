package com.project.biscuit.model.dto.campaign;

import com.project.biscuit.model.Books;
import com.project.biscuit.model.Recycle;
import com.project.biscuit.model.User;
import com.project.biscuit.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class AddRecycleRequestDto {

    private String title;  // 게시글 제목
    private String content; //게시글
    private String pickupAddress; //픽업 장소
    private String isbn; // 책 정보
    private String userId; // 게시글 작성자 아이디
    private Status status; //도서 상태

    public Recycle toEntity(User user, Books book) {

        return Recycle.builder()
                .title(title)
                .content(content)
                .pickupAddress(pickupAddress)
                .userNo(user)
                .bookNo(book)
                .status(status)
                .build();
    }
}
