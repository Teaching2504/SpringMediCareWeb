package com.ttkp.controllers;

import com.ttkp.pojo.Specialty;
import com.ttkp.services.SpecialtyService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiSpecialtyController {

    @Autowired
    private SpecialtyService specialtyService;

    @GetMapping("/specialties")
    public ResponseEntity<List<Specialty>> list() {
        return new ResponseEntity<>(this.specialtyService.getSpecialties(), HttpStatus.OK);
    }

    @GetMapping("/specialties/{id}")
    public ResponseEntity<Specialty> retrieve(@PathVariable("id") int id) {
        Specialty s = this.specialtyService.getSpecialtyById(id);

        if (s == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(s, HttpStatus.OK);
    }
}
