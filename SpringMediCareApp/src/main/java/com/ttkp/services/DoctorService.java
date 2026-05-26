package com.ttkp.services;

import com.ttkp.pojo.Doctor;
import java.util.List;
import java.util.Map;

public interface DoctorService {

    List<Doctor> getDoctors(Map<String, String> params);

    Doctor getDoctorById(int id);
}
