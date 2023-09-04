package com.amy.starryaccessory.dto;

import com.amy.starryaccessory.entity.Address;
import com.amy.starryaccessory.entity.Customer;
import com.amy.starryaccessory.entity.Order;
import com.amy.starryaccessory.entity.OrderItem;

import lombok.Data;
import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
