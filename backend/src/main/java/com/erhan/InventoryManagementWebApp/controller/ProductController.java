package com.erhan.InventoryManagementWebApp.controller;

import com.erhan.InventoryManagementWebApp.exception.ResourceNotFoundException;
import com.erhan.InventoryManagementWebApp.model.Product;
import com.erhan.InventoryManagementWebApp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = productRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Product not found! (id = %d)", id)));
        return ResponseEntity.ok(product);
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product){
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails){
        //retrieve product from db
        Product product = productRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Product not found! (id = %d)", id)));

        // update all product details
        product.setBrand(productDetails.getBrand());
        product.setCategory(productDetails.getCategory());
        product.setDescription(productDetails.getDescription());
        product.setLocation(productDetails.getLocation());
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());

        // save updated product
        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Boolean>>deleteProduct(@PathVariable Long id){
        // retrieve prdocut from db
        Product product = productRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Product not found! (id = %d)", id)));
        String productName = product.getName();

        productRepository.delete(product);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Product deleted: " + productName, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
