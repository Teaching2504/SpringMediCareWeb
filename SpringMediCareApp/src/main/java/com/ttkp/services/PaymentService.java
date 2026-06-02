package com.ttkp.services;

import com.ttkp.pojo.Payment;
import com.ttkp.pojo.PaymentItem;
import java.util.List;

public interface PaymentService {

    List<Payment> getPaymentsByCurrentPatient();

    void addPayment(PaymentItem item);
}
