package com.amy.starryaccessory.entity;

import java.math.BigDecimal;
import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "stock")
    private Long stock;

    @Column(name = "available_stock")
    private Long availableStock;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "category")
    private String category;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

}
