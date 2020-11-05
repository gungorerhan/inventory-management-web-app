package com.erhan.InventoryManagementWebApp.controller;

import com.erhan.InventoryManagementWebApp.exception.ResourceNotFoundException;
import com.erhan.InventoryManagementWebApp.model.Category;
import com.erhan.InventoryManagementWebApp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class CategoryController{

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        Category category = categoryRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Category not found! (id = %d)", id)));
        return ResponseEntity.ok(category);
    }

    //TODO implement get products of a category method here

    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails){
        // retrieve category from db
        Category category = categoryRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Category not found! (id = %d)", id)));

        // update all category details
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());

        // save updated category to db
        Category updatedCategory = categoryRepository.save(category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Map<String, Boolean>>deleteCategory(@PathVariable Long id){
        // retrieve category from db
        Category category = categoryRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Category not found! (id = %d)", id)));
        String categoryName = category.getName();

        categoryRepository.delete(category);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Category deleted: " + categoryName, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
