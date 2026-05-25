/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttkp.services.impl;

import com.ttkp.pojo.Patient;
import com.ttkp.repositories.PatientRepository;
import com.ttkp.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author MY PC
 */
@Service
public class PatientServiceImpl implements PatientService{
    @Autowired
    private PatientRepository patientRepo;
    
    @Override
    public Patient getPatientById(int id){
        return this.patientRepo.getPatientById(id);
    }
}
