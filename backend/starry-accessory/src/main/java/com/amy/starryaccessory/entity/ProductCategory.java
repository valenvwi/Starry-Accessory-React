package com.amy.starryaccessory.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;

@Entity
@Table(name="product_category")
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="category_name")
    private String categoryName;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;
    
}
