package com.shivangam.ProductManager.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.shivangam.ProductManager.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findByNameIgnoreCase(String name);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(concat('%', :text, '%')) OR LOWER(p.type) LIKE LOWER(concat('%', :text, '%')) OR LOWER(p.place) LIKE LOWER(concat('%', :text, '%'))")
    List<Product> findAllByText(@Param("text") String text);

    List<Product> findAllByPlaceIgnoreCase(String place);

    List<Product> findAllByWarrantyLessThan(int currentYear);
}
