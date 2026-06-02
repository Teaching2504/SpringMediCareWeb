package com.ttkp.services.impl;

import com.ttkp.pojo.Payment;
import com.ttkp.pojo.PaymentItem;
import com.ttkp.repositories.PaymentRepository;
import com.ttkp.services.PaymentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepo;

    @Override
    public List<Payment> getPaymentsByCurrentPatient() {
        return this.paymentRepo.getPaymentsByCurrentPatient();
    }

    @Override
    public void addPayment(PaymentItem item) {
        this.paymentRepo.addPayment(item);
    }
}
