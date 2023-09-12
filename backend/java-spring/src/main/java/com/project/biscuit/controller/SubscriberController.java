package com.project.biscuit.controller;

import com.project.biscuit.model.User;
import com.project.biscuit.model.UserSub;
import com.project.biscuit.model.dto.UserSubResponse;
import com.project.biscuit.service.UserService;
import com.project.biscuit.service.UserSubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SubscriberController {
    private final UserSubService userSubService;
    private final UserService userService;

    // 내가 구독한 블로그들 (read)
    @GetMapping("/api/subscribers/{no}")

    public ResponseEntity<List<UserSubResponse>> findAllSubscribers(@PathVariable long no) {
        List<UserSubResponse> subscribers = userSubService.getUserSubscriptions(no)
                .stream()
                .map(UserSubResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(subscribers);
    }

    // 나를 구독한 구독자들 (read)
    @GetMapping("/api/subscribeBlog/{no}")
    public ResponseEntity<List<UserSubResponse>> findAllSubscribes(@PathVariable long no) {
        List<UserSubResponse> subscribers = userSubService.getSubscribers(no)
                .stream()
                .map(UserSubResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(subscribers);
    }

    // 구독 취소 ( delete )
    @DeleteMapping("/api/subscriptions/{userNo}/{subedUserNo}")
    public ResponseEntity<String> cancelSubscription(
            @PathVariable("userNo") Long userNo,
            @PathVariable("subedUserNo") Long subedUserNo
    ) {
        if (userSubService.cancelSubscription(userNo, subedUserNo)) {
            return ResponseEntity.ok("구독이 취소되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("구독 취소 중 오류가 발생했습니다.");
        }
    }

    // 구독하기
    @PostMapping("/api/subscribe/{userNo}/{subedUserNo}")
    public ResponseEntity<String> subscribe(
            @PathVariable Long userNo,
            @PathVariable Long subedUserNo
    ) {
        boolean isSubscribed = userSubService.isSubscribed(userNo, subedUserNo);

        if (isSubscribed) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 구독 중입니다.");
        }

        User user = userService.getUserByNo(userNo);
        User subedUser = userService.getUserByNo(subedUserNo);

        UserSub userSub = UserSub.builder()
                .user(user)
                .subedUser(subedUser)
                .build();

        userSubService.saveUserSub(userSub);
        return ResponseEntity.ok("구독이 완료되었습니다.");
    }

}
