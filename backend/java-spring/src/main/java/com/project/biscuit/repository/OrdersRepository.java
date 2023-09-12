package com.project.biscuit.repository;

import com.project.biscuit.model.Orders;
import com.project.biscuit.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUser_noOrderByCreatedAtDesc(Long userNo);
    List<Orders> findByUser_noAndStatusOrderByCreatedAtDesc(Long userNo, OrderStatus orderStatus);

}
