package com.ttkp.services;

import com.ttkp.pojo.Doctor;
import java.util.List;

public interface DoctorService {

    List<Doctor> getDoctors();

    Doctor getDoctorById(int id);
}
