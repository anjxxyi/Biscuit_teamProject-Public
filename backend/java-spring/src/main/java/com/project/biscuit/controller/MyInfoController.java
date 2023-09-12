package com.project.biscuit.controller;

import com.project.biscuit.model.dto.BkclassMemReqDto;
import com.project.biscuit.model.dto.BookclassReponseDto;
import com.project.biscuit.model.dto.books.BookClipRequestDto;
import com.project.biscuit.model.dto.books.BookClipResponseDto;
import com.project.biscuit.model.dto.user.UserInfoUpdateDto;
import com.project.biscuit.model.dto.user.UserPasswordUpdateDto;
import com.project.biscuit.model.dto.user.UserQuitRequestDto;
import com.project.biscuit.model.dto.user.UserResponseDto;
import com.project.biscuit.service.BookclassService;
import com.project.biscuit.service.BookclipService;
import com.project.biscuit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MyInfoController {

    private final BookclassService bookclassService;
    private final BookclipService bookclipService;
    private final UserService userService;

    // 사용자 북클립 조회
    @PostMapping("/clip")
    public ResponseEntity<List<BookClipResponseDto>> bookList(@RequestBody BookClipRequestDto req) {
        return ResponseEntity.ok(bookclipService.getMyClips(req));
    }

    //유저 정보 조회
    @GetMapping("/info")
    public ResponseEntity<UserResponseDto> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyInfoBySecurity());
    }

    //비밀번호 변경
    @PutMapping("/info/{no}")
    public void updateUserPw(
            @PathVariable Long no,
            @RequestBody UserPasswordUpdateDto request) {
        userService.updatePassword(request);
    }
    //비번 일치여부 확인
    @PostMapping("/{no}/check")
    public boolean checkPw(@PathVariable Long no, @RequestBody UserPasswordUpdateDto dto){
        boolean result = userService.checkPw(no, dto.getPassword());
        return result;
    }

    //회원정보 수정
    @PutMapping("/info/update")
    public UserResponseDto updateUserInfo(@RequestBody UserInfoUpdateDto requestDto) {
        UserResponseDto user = userService.updateMemberInfo(requestDto);
        return user;
    }

    //회원 탈퇴
    @PutMapping("/{userId}/quit")
    public void quitUser(@PathVariable String userId, @RequestBody UserQuitRequestDto requestDto){
        userService.qiutUser(requestDto);
    }

    // 사용자 북클래스 개설 목록 조회
    @PostMapping("/class/open")
    public ResponseEntity<List<BookclassReponseDto>> openedClass(@RequestBody BkclassMemReqDto req) {
        return ResponseEntity.ok(bookclassService.getOpenedClass(req));
    }

    // 사용자 북클래스 참여 목록 조회
    @PostMapping("/class/party")
    public ResponseEntity<List<BookclassReponseDto>> participatedClass(@RequestBody BkclassMemReqDto req) {
        return ResponseEntity.ok(bookclassService.getParticipatedClass(req));
    }

}
