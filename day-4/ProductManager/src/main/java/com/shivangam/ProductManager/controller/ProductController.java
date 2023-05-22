package com.shivangam.ProductManager.controller;

import com.shivangam.ProductManager.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shivangam.ProductManager.service.ProductService;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ProductController {
    @Autowired
    ProductService service;

    @GetMapping("/products")
    public Page<Product> getAllProducts(Pageable pageable) {
        return service.getAllProducts(pageable);
    }

    @GetMapping("/products/search")
    public Page<Product> getAllByText(@RequestParam("q") String text, Pageable pageable) {
        return service.getProductsWithText(text, pageable);
    }

    @GetMapping("/products/expired")
    public Page<Product> getAllExpired(Pageable pageable) {
        return service.getExpiredWarrantyProducts(pageable);
    }

    @GetMapping("/products/place/{place}")
    public Page<Product> getAllByPlace(@PathVariable String place, Pageable pageable) {
        return service.getProductsByPlace(place, pageable);
    }

    @GetMapping("/product/{name}")
    public Product getProductByName(@PathVariable String name) {
        return service.getProduct(name);
    }

    @PostMapping("/product")
    public @ResponseBody ResponseEntity<Map<String, Object>> addProduct(@RequestBody Product p) {
        service.addProduct(p);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product Created Successfully");
        return ResponseEntity.ok(response);
    }
}
