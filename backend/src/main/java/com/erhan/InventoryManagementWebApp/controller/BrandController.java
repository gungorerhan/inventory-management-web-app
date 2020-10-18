package com.erhan.InventoryManagementWebApp.controller;

import com.erhan.InventoryManagementWebApp.exception.ResourceNotFoundException;
import com.erhan.InventoryManagementWebApp.model.Brand;
import com.erhan.InventoryManagementWebApp.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    @GetMapping("/brands")
    public List<Brand> getAllBrands(){
        return brandRepository.findAll();
    }

    @GetMapping("/brands/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Long id){
        Brand brand = brandRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Brand not found! (id = %d)", id)));
        return ResponseEntity.ok(brand);
    }

    @PostMapping("/brands")
    public Brand createBrand(@RequestBody Brand brand){
        return brandRepository.save(brand);
    }

    @PutMapping("/brands/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand brandDetails){
        // retrieve Brand from db
        Brand brand = brandRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Brand not found! (id = %d)", id)));

        // update all Brand details
        brand.setName(brandDetails.getName());
        brand.setDescription(brandDetails.getDescription());

        // save updated Brand to db
        Brand updatedBrand = brandRepository.save(brand);
        return ResponseEntity.ok(updatedBrand);
    }

    @DeleteMapping("/brands/{id}")
    public ResponseEntity<Map<String, Boolean>>deleteBrand(@PathVariable Long id){
        // retrieve Brand from db
        Brand brand = brandRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException(String.format("Brand not found! (id = %d)", id)));
        String brandName = brand.getName();

        brandRepository.delete(brand);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Brand deleted: " + brandName, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
