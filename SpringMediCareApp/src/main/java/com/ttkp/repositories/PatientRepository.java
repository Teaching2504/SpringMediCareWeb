/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttkp.repositories;
import com.ttkp.pojo.Patient;
/**
 *
 * @author MY PC
 */
public interface PatientRepository {
    Patient getPatientById(int id);
}
