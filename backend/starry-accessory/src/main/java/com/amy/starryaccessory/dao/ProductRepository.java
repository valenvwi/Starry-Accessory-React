package com.amy.starryaccessory.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.amy.starryaccessory.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    Page<Product> findByCategory(@RequestParam("category") String category, Pageable pageable);

    @Query("select o from Product o where id in :product_ids")
    List<Product> findProductsByProductIds(@Param("product_ids") List<Long> productId);

}
