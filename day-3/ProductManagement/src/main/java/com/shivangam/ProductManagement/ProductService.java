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
        return db.findByNameIgnoreCase(name);
    }

    public List<Product> getProductsWithText(String text) {
        return db.findAllByText(text);
    }

    public List<Product> getProductsByPlace(String place) {
        return db.findAllByPlaceIgnoreCase(place);
    }

    public List<Product> getExpiredWarrantyProducts() {
        int currentYear = Year.now().getValue();
        return db.findAllByWarrantyLessThan(currentYear);
    }
}
