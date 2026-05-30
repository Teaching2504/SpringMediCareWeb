package com.ttkp.controllers;

import com.ttkp.pojo.Drug;
import com.ttkp.services.DrugService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiDrugController {

    @Autowired
    private DrugService drugService;

    @GetMapping("/drugs")
    public ResponseEntity<List<Drug>> list(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.drugService.getDrugs(params), HttpStatus.OK);
    }

    @GetMapping("/drugs/{id}")
    public ResponseEntity<Drug> retrieve(@PathVariable("id") int id) {
        Drug d = this.drugService.getDrugById(id);

        if (d == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(d, HttpStatus.OK);
    }
}
