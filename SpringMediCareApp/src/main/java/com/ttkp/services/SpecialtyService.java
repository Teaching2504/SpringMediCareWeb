package com.ttkp.services;

import com.ttkp.pojo.Specialty;
import java.util.List;

public interface SpecialtyService {
    List<Specialty> getSpecialties();
    Specialty getSpecialtyById(int id);
}