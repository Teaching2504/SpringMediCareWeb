package com.ttkp.controllers;

import com.ttkp.pojo.PaymentItem;
import com.ttkp.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiPaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/secure/pay")
    @ResponseStatus(HttpStatus.CREATED)
    public void addPayment(@RequestBody PaymentItem item) {
        this.paymentService.addPayment(item);
    }
}
