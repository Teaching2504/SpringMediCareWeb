package com.ttkp.repositories.impl;

import com.ttkp.pojo.Appointment;
import com.ttkp.pojo.Patient;
import com.ttkp.pojo.Payment;
import com.ttkp.pojo.PaymentItem;
import com.ttkp.pojo.User;
import com.ttkp.repositories.AppointmentRepository;
import com.ttkp.repositories.PatientRepository;
import com.ttkp.repositories.PaymentRepository;
import com.ttkp.repositories.UserRepository;
import jakarta.persistence.Query;
import java.util.Date;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class PaymentRepositoryImpl implements PaymentRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Override
    public List<Payment> getPaymentsByCurrentPatient() {
        Session session = this.factory.getObject().getCurrentSession();

        User user = this.userRepo.getUserByUsername(
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName()
        );

        Patient patient
                = this.patientRepo.getPatientByUserId(user.getId());

        Query query = session.createNamedQuery(
                "Payment.findByPatientId",
                Payment.class
        );

        query.setParameter("patientId", patient.getPatientId());

        return query.getResultList();
    }

    @Override
    public void addPayment(PaymentItem item) {
        Session session = this.factory.getObject().getCurrentSession();

        User user = this.userRepo.getUserByUsername(
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName()
        );

        Patient patient
                = this.patientRepo.getPatientByUserId(user.getId());

        Appointment appointment
                = this.appointmentRepo
                        .getAppointmentById(item.getAppointmentId());

        Payment payment = new Payment();

        payment.setPatientId(patient);
        payment.setAppointmentId(appointment);
        payment.setAmount(item.getAmount());
        payment.setPaymentMethod(item.getPaymentMethod());
        payment.setStatus("paid");
        payment.setCreatedDate(new Date());

        session.persist(payment);
    }
}
