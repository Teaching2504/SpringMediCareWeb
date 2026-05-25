package com.ttkp.repositories.impl;

import com.ttkp.pojo.Doctor;
import com.ttkp.repositories.DoctorRepository;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class DoctorRepositoryImpl implements DoctorRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    
    @Override
    public List<Doctor> getDoctors() {
        Session session = this.factory.getObject().getCurrentSession();
        return session.createNamedQuery("Doctor.findAll", Doctor.class).getResultList();
    }

    @Override
    public Doctor getDoctorById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Doctor.class, id);
    } 
}