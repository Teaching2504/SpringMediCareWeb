package com.ttkp.repositories.impl;

import com.ttkp.configs.HibernateUtils;
import com.ttkp.pojo.Appointment;
import com.ttkp.repositories.AppointmentRepository;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class AppointmentRepositoryImpl implements AppointmentRepository {

    @Override
    public boolean addAppointment(Appointment appointment) {
        Session session = null;
        Transaction tx = null;

        try {
            session = HibernateUtils.getFactory().openSession();
            tx = session.beginTransaction();

            session.persist(appointment);

            tx.commit();
            return true;

        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }

            e.printStackTrace();
            return false;

        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(int patientId) {
        try (Session session = HibernateUtils.getFactory().openSession()) {
            Query<Appointment> q = session.createQuery(
                    "FROM Appointment a WHERE a.patientId.patientId = :patientId",
                    Appointment.class
            );
            q.setParameter("patientId", patientId);

            return q.getResultList();
        }
    }

    @Override
    public Appointment getAppointmentById(int id) {
        try (Session session = HibernateUtils.getFactory().openSession()) {
            return session.get(Appointment.class, id);
        }
    }

    @Override
    public boolean updateAppointmentStatus(int id, String status) {
        Session session = null;
        Transaction tx = null;

        try {
            session = HibernateUtils.getFactory().openSession();
            tx = session.beginTransaction();

            Appointment a = session.get(Appointment.class, id);

            if (a == null) {
                return false;
            }

            a.setStatus(status);
            session.merge(a);

            tx.commit();
            return true;

        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }

            e.printStackTrace();
            return false;

        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }
}