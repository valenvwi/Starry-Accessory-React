package com.amy.starryaccessory.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amy.starryaccessory.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndProductId(String userEmail, Long ProductId);

    List<Checkout> findProductsByUserEmail(String userEmail);

}
