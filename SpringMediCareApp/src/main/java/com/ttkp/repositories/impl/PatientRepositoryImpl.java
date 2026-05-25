/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttkp.repositories.impl;

import com.ttkp.pojo.Patient;
import com.ttkp.repositories.PatientRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author MY PC
 */
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
