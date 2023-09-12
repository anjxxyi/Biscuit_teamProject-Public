package com.project.biscuit.controller;

import com.project.biscuit.model.Goods;
import com.project.biscuit.model.dto.AddGoodsRequest;
import com.project.biscuit.model.dto.GoodsWithImagesDto;
import com.project.biscuit.model.dto.UpdateGoodsRequest;
import com.project.biscuit.service.GoodsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/goods")
@RestController
public class GoodsController {

    private final GoodsService goodsService;

    // 굿즈 등록
    @PostMapping("/upload")
    public ResponseEntity<Goods> uploadGoods(@RequestBody AddGoodsRequest request) {
        Goods uploadGoods = goodsService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(uploadGoods);
    }

    // 굿즈 전체 리스트
    @GetMapping("/list/all")
    public ResponseEntity<List<GoodsWithImagesDto>> findAllGoods() {
        List<GoodsWithImagesDto> goods = goodsService.getAllGoodsWithImg()
                .stream()
                .map(result -> new GoodsWithImagesDto(result.getGoods(), result.getImages()))
                .toList();
        return ResponseEntity.ok().body(goods);
    }

    // 판매 중인 굿즈 리스트
    @GetMapping("/list")
    public ResponseEntity<List<GoodsWithImagesDto>> findSalesGoods() {
        List<GoodsWithImagesDto> allGoods = goodsService.findAllSaleYn()
                .stream()
                .map(result -> new GoodsWithImagesDto(result.getGoods(), result.getImages()))
                .toList();

        return ResponseEntity.ok().body(allGoods);
    }
    //품절상품 리스트
    @GetMapping("/list/inventory")
    public ResponseEntity<List<GoodsWithImagesDto>> findInventoryGoods() {
        List<GoodsWithImagesDto> allGoods = goodsService.findAllInventory()
                .stream()
                .map(result -> new GoodsWithImagesDto(result.getGoods(), result.getImages()))
                .toList();

        return ResponseEntity.ok().body(allGoods);
    }

    // 굿즈 상세
    @GetMapping("/{no}")
    public List<GoodsWithImagesDto> findByIdGoodsWithImages(@PathVariable long no) {
        return goodsService.findByIdGoodsWithImages(no);
    }

    // 굿즈 수정하기
    @PutMapping("/{no}")
    public ResponseEntity<Goods> updateGoods(@PathVariable long no, @RequestBody UpdateGoodsRequest request) {
        Goods updateGoods = goodsService.update(no, request);

        return ResponseEntity.ok().body(updateGoods);
    }

    //구매시 inventory -1
    @PutMapping("/{no}/sale")
    public void updateSale(@PathVariable Long no){
        goodsService.updateInventory(no);
    }

}
