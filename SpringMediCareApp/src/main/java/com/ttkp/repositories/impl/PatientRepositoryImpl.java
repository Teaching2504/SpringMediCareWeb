package com.ttkp.repositories.impl;

import com.ttkp.pojo.Patient;
import com.ttkp.repositories.PatientRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
@Transactional
public class PatientRepositoryImpl implements PatientRepository{

    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public Patient getPatientById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Patient.class, id);
    }
}
