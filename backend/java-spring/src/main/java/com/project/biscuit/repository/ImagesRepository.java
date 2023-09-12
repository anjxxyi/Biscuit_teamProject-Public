package com.project.biscuit.repository;

import com.project.biscuit.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImagesRepository extends JpaRepository<Images, Long> {
    Optional<Images> findByImgName(String imgName);

    Optional<Images> findByGoods_NoAndThumbnailYn(Long no, String yn);
}
