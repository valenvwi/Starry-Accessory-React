package com.amy.starryaccessory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amy.starryaccessory.entity.Product;
import com.amy.starryaccessory.service.ProductService;
import com.amy.starryaccessory.utils.ExtractJWT;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/secure/shoppingcart/count")
    public int shoppingCartCount(@RequestHeader(value="Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return productService.shoppingCartCount(userEmail);
    }

    @GetMapping("/secure/isaddedtocart/byuser")
    public Boolean inShoppingCart(@RequestHeader(value="Authorization") String token,
    @RequestParam Long productId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return productService.inShoppingCart(userEmail, productId);
    }

    @PutMapping("/secure/addtocart")
    public Product addToCart(@RequestHeader(value="Authorization") String token,
    @RequestParam Long productId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return productService.addToCart(userEmail, productId);
    }
}
