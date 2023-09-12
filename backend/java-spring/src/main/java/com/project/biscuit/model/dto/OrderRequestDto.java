package com.project.biscuit.model.dto;

import com.project.biscuit.model.Orders;
import com.project.biscuit.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private String pay_method;
    private String merchant_uid;
    private String name;
    private Long amount;
    private int pd_cnt;
    private Long pd_no;
    private String pd_type;
    private String buyer_email;
    private String buyer_name;
    private String buyer_tel;
    private String buyer_addr;
    private int buyer_postcode;
    private long user_no;

    private long order_no;
    private String order_status;

    public Orders toOrders(User user) {
        return Orders.builder()
                .payment(pay_method)
                .merchant_uid(merchant_uid)
                .orderCnt(pd_cnt)
                .orderPrice(amount)
                .phone(buyer_tel)
                .shipTo(buyer_name)
                .shipAddress(user.getAddress())
                .shipDetail(user.getAddress_detail())
                .shipPost(buyer_postcode)
                .user(user)
                .build();
    }
}
