package com.ttkp.repositories;

import com.ttkp.pojo.Payment;
import com.ttkp.pojo.PaymentItem;
import java.util.List;

public interface PaymentRepository {

    List<Payment> getPaymentsByCurrentPatient();

    void addPayment(PaymentItem item);
}
