package com.ttkp.controllers;

import com.ttkp.pojo.Category;
import com.ttkp.services.CategoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiCategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/drug-categories")
    public ResponseEntity<List<Category>> list() {
        return new ResponseEntity<>(
                this.categoryService.getCategories(),
                HttpStatus.OK
        );
    }
}