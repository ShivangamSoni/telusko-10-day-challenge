package com.shivangam.ProductManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Year;

import com.shivangam.ProductManager.model.Product;
import com.shivangam.ProductManager.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository repository;

    public void addProduct(Product product) {
        repository.save(product);
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Product getProduct(String name) {
        return repository.findByNameIgnoreCase(name);
    }

    public Product getProductById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Page<Product> getProductsWithText(String text, Pageable pageable) {
        return repository.findAllByText(text, pageable);
    }

    public Page<Product> getProductsByPlace(String place, Pageable pageable) {
        return repository.findAllByPlaceIgnoreCase(place, pageable);
    }

    public Page<Product> getExpiredWarrantyProducts(Pageable pageable) {
        int currentYear = Year.now().getValue();
        return repository.findAllByWarrantyLessThan(currentYear, pageable);
    }
}
