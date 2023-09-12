package com.project.biscuit.service;

import com.project.biscuit.config.jwt.JwtTokenProvider;
import com.project.biscuit.model.Booklog;
import com.project.biscuit.model.User;
import com.project.biscuit.model.dto.user.*;
import com.project.biscuit.repository.BooklogRepository;
import com.project.biscuit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@RequiredArgsConstructor
@Service
@Transactional
public class UserService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final BooklogRepository booklogRepository;


    //회원가입
    public UserResponseDto signup(UserSignupRequestDto requestDto) {
        if (userRepository.existsByUserId(requestDto.getUserId())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }
        User user = requestDto.toUser(passwordEncoder);
        user = userRepository.save(user);

        // 사용자를 위한 기본 Booklog 생성
        Booklog defaultBooklog = Booklog.builder()
                .booklogName(requestDto.getUserId() + "님의 북로그 입니다") // 사용자의 userId를 기본 booklog_name으로 설정
                .intro("소개글을 남겨주세요~") // 기본 intro 설정
                .user(user) // Booklog에 사용자 설정
                .build();
        booklogRepository.save(defaultBooklog);

        return UserResponseDto.of(user);
    }

    /** 로그인 */
    public UserResponseDto login(UserLoginRequestDto requestDto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(requestDto.getUserId(), requestDto.getPassword());
        // 계정정보를 비교하기 전 시큐리티 사용자 정보(principal)를 세팅(loadUserByUsername 메소드 호출)하고
        // 그 이후 UsernamePasswordAuthenticationToken을 사용하여 아이디와 패스워드가 같은지 비교
        Authentication authentication = managerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);

            User user = userRepository.findByUserId(requestDto.getUserId()).get();
            System.out.println("Login User:" + user.getUserId());
            user.setAccessToken(jwtTokenDto.getAccessToken());
            user.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());

            return UserResponseDto.of(userRepository.save(user));
    }

    //아이디 중복확인
    public boolean isUserIdUnique(String userId) {
        return userRepository.existsByUserId(userId);
    }
    //탈퇴 아이디 중복확인
    public boolean isQuit(String userId) {
        return userRepository.existsByQuitYn(userId);
    }
    
    //닉네임 중복확인
    public boolean isNicknameUnique(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    //유저 ID 조회
    public String getUserId(FindIdRequestDto findIdRequestDto){
        if(userRepository.existsByNameAndBirthAndPhone(findIdRequestDto.getName(), findIdRequestDto.getBirth(), findIdRequestDto.getPhone())){
            String userId = userRepository.findIdByNameAndBirthAndPhone(findIdRequestDto.getName(), findIdRequestDto.getBirth(), findIdRequestDto.getPhone()).get().getUserId();
            return userId;
        } else {
            return "회원정보가 없습니다";
        }
    }

    //일치회원 여부 확인
    public boolean existPassword(FindPwRequestDto requestDto) {
        return userRepository.existsByUserIdAndNameAndBirthAndPhone(requestDto.getUserId(), requestDto.getName(), requestDto.getBirth(), requestDto.getPhone());
    }

    //유저 패스워드 변경(회원정보 수정에서)
    @Transactional
    public void updatePassword( UserPasswordUpdateDto dto){
        User user = userRepository.findById(dto.getNo()).orElseThrow(() ->
                new IllegalArgumentException("해당 유저가 존재 하지 않습니다."));
        String password = passwordEncoder.encode(dto.getPassword());
        user.updatePassword(password);
    }
    //유저 패스워드 변경(비밀번호 찾기 후 변경)
    @Transactional
    public void updatePassword(String userId, FindPwUpdateDto dto){
        User user = userRepository.findByUserId(userId).orElseThrow(() ->
                new IllegalArgumentException("해당 유저가 존재 하지 않습니다."));
        String password = passwordEncoder.encode(dto.getPassword());
        user.updatePassword(password);
    }

    //유저 정보 조회
    public UserResponseDto getMyInfoBySecurity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String no = authentication.getName();
        Optional<UserResponseDto> userOptional =
                userRepository.findById(Long.valueOf(no)).map(UserResponseDto::of);
        if(userOptional.isEmpty())
            return null;

        return userOptional.get();
    }

    //비번 일치여부
    public Boolean checkPw(Long no, String rawPw){
        User user = userRepository.findByNo(no);
        if(passwordEncoder.matches(rawPw, user.getPassword())){
            return true;
        } else{
            return false;
        }
    }

    //회원정보 수정
    @Transactional
    public UserResponseDto updateMemberInfo(UserInfoUpdateDto requestDto) {
        User user = userRepository.findById(requestDto.getNo()).orElseThrow(() ->
                new IllegalArgumentException("해당 아이디가 존재하지 않습니다."));

        user.updateUser(
                requestDto.getPhone(),
                requestDto.getEmail(),
                requestDto.getNickname(),
                requestDto.getZipCode(),
                requestDto.getAddress(),
                requestDto.getAddress_detail()
        );

        return UserResponseDto.of(user.updateUser(requestDto.getPhone(),requestDto.getEmail(),requestDto.getNickname(),requestDto.getZipCode(),requestDto.getAddress(),requestDto.getAddress_detail()));
    }

    //회원 탈퇴
    @Transactional
    public ResponseEntity<String> qiutUser(UserQuitRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId()).orElseThrow(()->
                new IllegalArgumentException("회원 없음"));
        String quit = requestDto.getQuitYn();
        user.userQuit(quit);

        return ResponseEntity.ok().body(quit);
    }



    // =================================================================
    // 구독자 관리 기능
    // =================================================================
    public User getUserByNo(Long userNo) {
        return userRepository.findById(userNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
    }


}
