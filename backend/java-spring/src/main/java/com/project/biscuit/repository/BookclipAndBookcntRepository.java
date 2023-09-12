package com.project.biscuit.repository;

import com.project.biscuit.model.view.BookclipAndBookcnt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookclipAndBookcntRepository extends JpaRepository<BookclipAndBookcnt, Long> {

    List<BookclipAndBookcnt> findByUserNoOrderByBcntDescUpdatedAtDesc(long no);
}
