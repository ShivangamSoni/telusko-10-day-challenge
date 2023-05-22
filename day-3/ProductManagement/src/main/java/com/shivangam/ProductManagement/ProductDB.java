package com.shivangam.ProductManagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDB extends JpaRepository<Product, Integer> {
    @Query("SELECT p from Product p WHERE LOWER(p.name) = LOWER(:name)")
    Product findByName(@Param("name") String name);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(concat('%', :text, '%')) OR LOWER(p.type) LIKE LOWER(concat('%', :text, '%')) OR LOWER(p.place) LIKE LOWER(concat('%', :text, '%'))")
    List<Product> findAllByText(@Param("text") String text);
}
