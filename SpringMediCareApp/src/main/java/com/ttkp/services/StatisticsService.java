package com.ttkp.services;

import java.util.List;

public interface StatisticsService {

    List<Object[]> countPatientsByGender();

    List<Object[]> countPatientsByAgeGroup();
}
