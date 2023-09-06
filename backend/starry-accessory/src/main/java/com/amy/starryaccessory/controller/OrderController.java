package com.amy.starryaccessory.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.amy.starryaccessory.service.OrderService;
import com.amy.starryaccessory.utils.ExtractJWT;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("orderHistory")
public class OrderController {

    @GetMapping("/getTrackingNumber")
    public String trackingNumber(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return OrderService.getTrackingNumber(userEmail);
    }

    @GetMapping("/getEmail")
    public String userEmail(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return userEmail;
    }

}
