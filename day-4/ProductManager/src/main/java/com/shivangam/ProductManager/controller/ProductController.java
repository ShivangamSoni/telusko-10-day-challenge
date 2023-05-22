package com.shivangam.ProductManager.controller;

import com.shivangam.ProductManager.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.shivangam.ProductManager.service.ProductService;

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

    @GetMapping("/product/{name}")
    public Product getProductByName(@PathVariable String name) {
        return service.getProduct(name);
    }

    @PostMapping("/product")
    public void addProduct(@RequestBody Product p) {
        service.addProduct(p);
    }

}
