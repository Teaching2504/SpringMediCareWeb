package com.ttkp.services.impl;

import com.ttkp.repositories.StatisticsRepository;
import com.ttkp.services.StatisticsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepo;

    @Override
    public List<Object[]> countPatientsByGender() {
        return this.statisticsRepo.countPatientsByGender();
    }

    @Override
    public List<Object[]> countPatientsByAgeGroup() {
        return this.statisticsRepo.countPatientsByAgeGroup();
    }
}
