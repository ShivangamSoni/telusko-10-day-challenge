package com.shivangam.ProductManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductDB db;

    public void addProduct(Product product) {
        db.save(product);
    }

    public List<Product> getAllProducts() {
        return db.findAll();
    }

    public Product getProduct(String name) {
        return db.findByName(name);
    }

    public List<Product> getProductsWithText(String text) {
        return db.findByText(text);
    }

    public List<Product> getProductsByPlace(String place) {
        return null;
    }

    public List<Product> getExpiredWarrantyProducts() {
        int currentYear = Year.now().getValue();
        return null;
    }
}
