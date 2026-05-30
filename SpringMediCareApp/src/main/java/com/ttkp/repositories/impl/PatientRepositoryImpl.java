package com.ttkp.repositories.impl;

import com.ttkp.pojo.Patient;
import com.ttkp.repositories.PatientRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.query.Query;

@Repository
@Transactional
public class PatientRepositoryImpl implements PatientRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Patient getPatientById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Patient.class, id);
    }

    @Override
    public Patient getPatientByUserId(int userId) {
        Session session = this.factory.getObject().getCurrentSession();

        Query<Patient> q = session.createNamedQuery("Patient.findByUserId", Patient.class);
        q.setParameter("userId", userId);

        return q.uniqueResult();
    }
}
