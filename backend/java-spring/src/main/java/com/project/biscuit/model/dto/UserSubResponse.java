package com.project.biscuit.model.dto;

import com.project.biscuit.model.User;
import com.project.biscuit.model.UserSub;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserSubResponse {
    private Long no;

    private User subed_no;
    private User user_no;
    private LocalDateTime created_at;

    public UserSubResponse (UserSub userSub) {
        this.no = userSub.getNo();

        this.subed_no = userSub.getSubedUser();
        this.user_no = userSub.getUser();
        this.created_at = userSub.getCreatedAt();
    }
}
