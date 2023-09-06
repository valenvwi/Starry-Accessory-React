package com.amy.starryaccessory.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.amy.starryaccessory.dao.OrderRepository;
import com.amy.starryaccessory.entity.Order;
import com.amy.starryaccessory.entity.OrderItem;

@Service

public class OrderService {

    private static OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public static String getTrackingNumber(String userEmail) throws Exception {
        Page<Order> userOrderHistory = orderRepository.findByCustomerEmailOrderByDateCreatedDesc(userEmail, null);

        Optional<Order> lastOrderOptional = userOrderHistory.stream()
                .findFirst();

        if (lastOrderOptional.isPresent()) {
            Order lastOrder = lastOrderOptional.get();
            return lastOrder.getOrderTrackingNumber();
        } else {
            throw new Exception("No orders found for the user with email: " + userEmail);
        }
    }


}
