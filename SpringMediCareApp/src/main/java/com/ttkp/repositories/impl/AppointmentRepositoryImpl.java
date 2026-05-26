package com.ttkp.repositories.impl;

import com.ttkp.pojo.Appointment;
import com.ttkp.repositories.AppointmentRepository;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class AppointmentRepositoryImpl implements AppointmentRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public boolean addAppointment(Appointment appointment) {
        Session session = this.factory.getObject().getCurrentSession();
        session.persist(appointment);

        return true;
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(int patientId) {
        Session session = this.factory.getObject().getCurrentSession();
        Query<Appointment> q = session.createQuery(
                "FROM Appointment a WHERE a.patientId.patientId = :patientId",
                Appointment.class
        );
        q.setParameter("patientId", patientId);

        return q.getResultList();
    }

    @Override
    public Appointment getAppointmentById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Appointment.class, id);
    }

    @Override
    public boolean updateAppointmentStatus(int id, String status) {
        Session session = this.factory.getObject().getCurrentSession();

        Appointment a = session.get(Appointment.class, id);

        if (a == null) {
            return false;
        }

        a.setStatus(status);
        session.merge(a);

        return true;
    }
}
