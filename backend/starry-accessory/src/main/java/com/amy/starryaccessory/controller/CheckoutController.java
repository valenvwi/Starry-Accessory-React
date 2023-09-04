package com.amy.starryaccessory.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amy.starryaccessory.dto.Purchase;
import com.amy.starryaccessory.dto.PurchaseResponse;

import com.amy.starryaccessory.service.CheckoutService;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    // it's optional to put autowire when there's only one constructor
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }

}
