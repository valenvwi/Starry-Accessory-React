package com.amy.starryaccessory.service;

import java.time.LocalDate;

import java.util.Optional;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.amy.starryaccessory.dao.CheckoutRepository;
import com.amy.starryaccessory.dao.ProductRepository;
import com.amy.starryaccessory.entity.Checkout;
import com.amy.starryaccessory.entity.Product;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;

    private CheckoutRepository checkoutRepository;

    public ProductService(ProductRepository productRepository, CheckoutRepository checkoutRepository) {
        this.productRepository = productRepository;
        this.checkoutRepository = checkoutRepository;

    }

    public Product addToCart(String userEmail, Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);

        if (!product.isPresent() || validateCheckout != null || product.get().getAvailableStock() <= 0) {
            throw new Exception("Product doesn't exist or user already bought the same item");
        }

        product.get().setAvailableStock(product.get().getAvailableStock() - 1);
        productRepository.save(product.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                product.get().getId());

        checkoutRepository.save(checkout);

        return product.get();

    }

    public Boolean inShoppingCart(String userEmail, Long productId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }

    public int shoppingCartCount(String userEmail) {
        return checkoutRepository.findProductsByUserEmail(userEmail).size();
    }

}
