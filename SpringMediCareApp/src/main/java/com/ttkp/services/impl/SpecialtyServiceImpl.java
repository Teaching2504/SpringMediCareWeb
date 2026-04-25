package com.ttkp.services.impl;

import com.ttkp.pojo.Specialty;
import com.ttkp.repositories.SpecialtyRepository;
import com.ttkp.services.SpecialtyService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Override
    public List<Specialty> getSpecialties() {
        return this.specialtyRepository.getSpecialties();
    }

    @Override
    public Specialty getSpecialtyById(int id) {
        return this.specialtyRepository.getSpecialtyById(id);
    }
}
