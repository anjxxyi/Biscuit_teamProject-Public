package com.project.biscuit.controller;

import com.project.biscuit.model.Recycle;
import com.project.biscuit.model.dto.campaign.AddRecycleRequestDto;
import com.project.biscuit.model.dto.campaign.CampaignRequestDto;
import com.project.biscuit.model.dto.campaign.CampaignResponseDto;
import com.project.biscuit.model.dto.campaign.SaleCampaignRequestDto;
import com.project.biscuit.service.RecycleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/campaign")
public class CampaignController {

    private final RecycleService recycleService;
    
    //접수
    @PostMapping("/apply")
    public ResponseEntity<CampaignResponseDto> applyRecycle(@RequestBody AddRecycleRequestDto req) {
        return ResponseEntity.ok(recycleService.apply(req));
    }
    
    //승인된 게시물 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<CampaignResponseDto>> findAllList(@RequestParam("acceptYn") String acceptYn) {
        List<CampaignResponseDto> recycles = recycleService.findAllAcceptY(acceptYn).stream().map(CampaignResponseDto::new).toList();
        return ResponseEntity.ok().body(recycles);
    }
    //전체 게시물 조회
    @GetMapping("/list/all")
    public ResponseEntity<List<CampaignResponseDto>> findAllList() {
        List<CampaignResponseDto> recycles = recycleService.findAll().stream().map(CampaignResponseDto::new).toList();
        return ResponseEntity.ok().body(recycles);
    }
    
    //상세페이지
    @GetMapping("/{recycleNo}")
    public ResponseEntity<CampaignResponseDto> findRecycleNo(@PathVariable Long recycleNo) {
        Recycle recycle = recycleService.recycleView(recycleNo);
        return ResponseEntity.ok().body(new CampaignResponseDto(recycle));
    }

    //판매여부
    @PutMapping("/{recycleNo}/sale")
    public void updateSale(@PathVariable Long recycleNo, @RequestBody SaleCampaignRequestDto requestDto){
        recycleService.updateSaleYn(recycleNo, requestDto);
    }

    //승인여부
    @PutMapping("/accept/{recycleNo}")
    public void updateAccept(@PathVariable Long recycleNo, @RequestBody CampaignRequestDto requestDto){
        recycleService.updateAccept(requestDto);
    }


}
