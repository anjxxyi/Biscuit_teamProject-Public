package com.project.biscuit.repository;

import com.project.biscuit.model.Recycle;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecycleRepository extends JpaRepository<Recycle, Long> {

    //허용된 게시글만 보이게
    List<Recycle> findAllByAcceptYn(String accept);

    //recycle_no에 따라서 조회
    Optional<Recycle> findByRecycleNo(Long recycleNo);


    /** 게시글 조회수 */
    @Transactional
    @Modifying
    @Query("update Recycle r set r.cnt = r.cnt + 1 where r.recycleNo = :recycleNo")
    int updateCount(@Param("recycleNo") Long recycleNo);


}
