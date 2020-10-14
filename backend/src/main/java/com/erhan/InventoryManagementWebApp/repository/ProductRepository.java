package com.erhan.InventoryManagementWebApp.repository;

import com.erhan.InventoryManagementWebApp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
