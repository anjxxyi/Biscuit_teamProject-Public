package com.project.biscuit.controller;

import com.project.biscuit.model.dto.user.*;
import com.project.biscuit.service.UserService;
import com.project.biscuit.util.BadRequestException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
    @RequestMapping("/api/auth")
public class UserApiController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody @Valid UserSignupRequestDto requestDto) {
        UserResponseDto userResponseDto = null;
        try {
            userResponseDto = userService.signup(requestDto);
        } catch (RuntimeException e) {
            ResponseEntity.status(HttpServletResponse.SC_CONFLICT).body(requestDto.toUserResponseDto(requestDto));
        }
        return ResponseEntity.ok(userResponseDto);
    }

    /**
     * 로그인
     *
     * @param requestDto
     * @return 응답
     */
    @PostMapping("/signin")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserLoginRequestDto requestDto) {
        return ResponseEntity.ok(userService.login(requestDto));
    }

    /**
     * 아이디 중복 확인
     *
     * @param userId
     * @return 중복되면 true
     */
    @GetMapping("/idCheck")
    public boolean checkIdDuplication(@RequestParam("userId") String userId) throws BadRequestException {
        boolean idExist = userService.isUserIdUnique(userId);
        return idExist == false;
    }

    @GetMapping("/idCheck/quitYn")
    public boolean checkId(@RequestParam("userId") String userId) throws BadRequestException {
        boolean idQuit = userService.isQuit(userId);
        return idQuit == false;
    }

    //닉네임 중복확인
    @GetMapping("/nicknameCheck")
    public boolean checkUserNickname(@RequestParam("nickname") String nickname) throws BadRequestException {
        boolean nicknameExist = userService.isNicknameUnique(nickname);
        return nicknameExist == false;
    }

    //아이디 찾기
    @PostMapping("/findId")
    public ResponseEntity<FindIdResponseDto> findUserId(@RequestBody FindIdRequestDto requestDto) {
        String userId = userService.getUserId(requestDto);
        FindIdResponseDto responseDto = new FindIdResponseDto(userId);

        return ResponseEntity.ok(responseDto);
    }
    //일치하는 회원 여부 확인
    @PostMapping("/findPw")
    public boolean passwordExist(@RequestBody FindPwRequestDto requestDto){
        boolean existPw = userService.existPassword(requestDto);
        return existPw;
    }
    //비번 찾기 후 비번 변경
    @PutMapping("/findPw/{userId}")
    public void updateUserPw(
            @PathVariable String userId,
            @RequestBody FindPwUpdateDto request) {
        userService.updatePassword(userId, request);
    }
}
