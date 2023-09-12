package com.project.biscuit.repository;

import com.project.biscuit.model.Goods;
import com.project.biscuit.model.dto.GoodsWithImagesDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GoodsRepository extends JpaRepository<Goods, Long> {

    //no로 조회
    Optional<Goods> findByNo(long no);

    // 전체 굿즈 + img
    @Query("SELECT distinct new com.project.biscuit.model.dto.GoodsWithImagesDto(g, i) " +
            "FROM Goods g " +
            "JOIN Images i ON i.goods = g " +
            "WHERE i.thumbnailYn = 'Y' " +
            "ORDER BY g.no DESC")
    List<GoodsWithImagesDto> findAllGoodsWithImages();

    // 굿즈 no + img
    @Query("SELECT distinct new com.project.biscuit.model.dto.GoodsWithImagesDto(g, i) " +
            "FROM Goods g " +
            "JOIN Images i ON i.goods = g " +
            "WHERE g.no = :no  " +
            "ORDER BY g.no DESC ")
    List<GoodsWithImagesDto> findByIdGoodsWithImages(@Param("no") Long no);

    //판매 중인 굿즈만
    @Query("SELECT distinct new com.project.biscuit.model.dto.GoodsWithImagesDto(g, i) " +
            "FROM Goods g " +
            "JOIN Images i ON i.goods = g " +
            "WHERE  g.sale_yn = 'Y' AND i.thumbnailYn = 'Y' " +
            "ORDER BY g.no DESC")
    List<GoodsWithImagesDto> findAllBySaleYn();
    //품절 중인 굿즈
    @Query("SELECT distinct new com.project.biscuit.model.dto.GoodsWithImagesDto(g, i) " +
            "FROM Goods g " +
            "JOIN Images i ON i.goods = g " +
            "WHERE  g.inventory = 0 AND i.thumbnailYn = 'Y' " +
            "ORDER BY g.no DESC")
    List<GoodsWithImagesDto> findAllByInventoryYn();




}
