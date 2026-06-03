package com.ttkp.controllers;

import com.ttkp.services.StatisticsService;
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
public class ApiStatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/statistics/patients-by-gender")
    public ResponseEntity<List<Object[]>> countPatientsByGender() {
        return new ResponseEntity<>(
                this.statisticsService.countPatientsByGender(),
                HttpStatus.OK
        );
    }
}
