package com.erhan.InventoryManagementWebApp.repository;

import com.erhan.InventoryManagementWebApp.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN p.brand b " +
            "LEFT JOIN p.category c " +
            "WHERE " +
            "p.name LIKE %?1% OR p.location LIKE %?1% OR p.description LIKE %?1% OR " +
            "b.name LIKE %?1% OR " +
            "c.name LIKE %?1%")
    Page<Product> find(String searchWord, Pageable pageable);
}
