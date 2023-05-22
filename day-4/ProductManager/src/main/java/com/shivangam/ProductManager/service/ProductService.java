package com.shivangam.ProductManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;

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

    public Page<Product> getProductsWithText(String text, Pageable pageable) {
        return repository.findAllByText(text, pageable);
    }

    public List<Product> getProductsByPlace(String place) {
        return repository.findAllByPlaceIgnoreCase(place);
    }

    public Page<Product> getExpiredWarrantyProducts(Pageable pageable) {
        int currentYear = Year.now().getValue();
        return repository.findAllByWarrantyLessThan(currentYear, pageable);
    }
}
