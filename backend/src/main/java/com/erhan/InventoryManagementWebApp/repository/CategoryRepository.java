package com.erhan.InventoryManagementWebApp.repository;

import com.erhan.InventoryManagementWebApp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
