package com.project.biscuit.controller;

import com.project.biscuit.model.dto.user.UserResponseDto;
import com.project.biscuit.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    // 사용자 목록 전체 가져오기
    @GetMapping("/list/{type}")
    public ResponseEntity<List<UserResponseDto>> getListAll(@PathVariable String type) {
        return ResponseEntity.ok(adminService.getUserAll(type));
    }

    @GetMapping("/authority/{userNo}")
    public ResponseEntity<String> getListAll(@PathVariable List<Long> userNo) {
        return ResponseEntity.ok(adminService.changeAuthority(userNo));
    }

    @GetMapping("/out/{userNo}")
    public ResponseEntity<String> outUser(@PathVariable List<Long> userNo) {
        return ResponseEntity.ok(adminService.popToggleUser(userNo));
    }

}
