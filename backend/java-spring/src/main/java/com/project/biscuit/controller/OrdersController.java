package com.project.biscuit.controller;

import com.project.biscuit.model.Orders;
import com.project.biscuit.model.dto.OrderRequestDto;
import com.project.biscuit.model.dto.OrderResponseDto;
import com.project.biscuit.service.OrdersService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrdersController {

    private final OrdersService ordersService;

    // add orders / POST
    @Transactional
    @PostMapping("/add")
    public ResponseEntity<Orders> addOrders(@RequestBody OrderRequestDto req) {
        return ResponseEntity.ok(ordersService.addOrders(req));
    }

    // cancel orders / GET
    @GetMapping("/cancel/{no}")
    public ResponseEntity<String> cancelOrders(@PathVariable long no) {
        return ResponseEntity.ok(ordersService.cancelOrders(no));
    }

    // change order's status / POST
    @PostMapping("/change")
    public ResponseEntity<String> changeOrders(@RequestBody OrderRequestDto req) {
        return ResponseEntity.ok(ordersService.changeStatus(req));
    }

    // get orders ALL / GET
    @GetMapping("/all")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        return ResponseEntity.ok(ordersService.getOrderListforAdm());
    }

    //   get orders one's list / GET
    @GetMapping("/list/{no}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersList(@PathVariable long no) {
        return ResponseEntity.ok(ordersService.getOrderList(no));
    }

    // get orders sorted status / POST
    @PostMapping("/sort")
    public ResponseEntity<List<OrderResponseDto>> getOrderListWithStatus(@RequestBody OrderRequestDto req) {
        return ResponseEntity.ok(ordersService.getOrderListWithStatus(req.getUser_no(), req.getOrder_status()));
    }

}
