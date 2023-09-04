package com.amy.starryaccessory.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amy.starryaccessory.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);

}
