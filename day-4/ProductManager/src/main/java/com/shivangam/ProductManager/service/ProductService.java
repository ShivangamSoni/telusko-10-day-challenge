package com.shivangam.ProductManager.service;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProduct(String name) {
        return repository.findByNameIgnoreCase(name);
    }

    public List<Product> getProductsWithText(String text) {
        return repository.findAllByText(text);
    }

    public List<Product> getProductsByPlace(String place) {
        return repository.findAllByPlaceIgnoreCase(place);
    }

    public List<Product> getExpiredWarrantyProducts() {
        int currentYear = Year.now().getValue();
        return repository.findAllByWarrantyLessThan(currentYear);
    }
}
