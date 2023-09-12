package com.project.biscuit.service;

import com.project.biscuit.model.User;
import com.project.biscuit.model.dto.user.UserResponseDto;
import com.project.biscuit.model.enums.Authority;
import com.project.biscuit.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    // All user list
    public List<UserResponseDto> getUserAll(String type) { // type 설정
        return switch (type) {
            case "All" -> {
                List<User> userList = userRepository.findAll();
                yield  userList.stream().map(UserResponseDto::toAdmin).toList();
            }
            case "User" -> {
                List<User> userList = userRepository.findByAuthorityAndQuitYn(Authority.U, "N");
                yield  userList.stream().map(UserResponseDto::toAdmin).toList();
            }
            case "Out" -> {
                List<User> userList = userRepository.findByQuitYn("Y");
                yield  userList.stream().map(UserResponseDto::toAdmin).toList();
            }
            case "Admin" -> {
                List<User> userList = userRepository.findByAuthority(Authority.A);
                yield  userList.stream().map(UserResponseDto::toAdmin).toList();
            }
            default -> throw new IllegalStateException("Unexpected value: " + type);
        };
    }

    // 권한 변경
    @Transactional
    public String changeAuthority(List<Long> userNo) {
        if(userNo == null) return "incorrect request";
        else {
            userNo.forEach(item -> {
                User user = userRepository.findById(item).orElseThrow(() -> new IllegalArgumentException("Not found User"));

                if (user.getAuthority().equals(Authority.U)) user.setAuthority(Authority.A);
                else user.setAuthority(Authority.U);
            });
            return "success";
        }
    }

    // 회원 상태 변경
    @Transactional
    public String popToggleUser(List<Long> userNo) {
        if(userNo == null) return "incorrect request";
        else {
            userNo.forEach(item -> {
                User user = userRepository.findById(item).orElseThrow(() -> new IllegalArgumentException("Not found User"));

                if (user.getQuitYn().equals("N")) user.setQuitYn("Y");
                else user.setQuitYn("N");
            });
            return "success";
        }
    }
}
