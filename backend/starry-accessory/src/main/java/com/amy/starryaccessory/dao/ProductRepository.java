package com.amy.starryaccessory.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amy.starryaccessory.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
