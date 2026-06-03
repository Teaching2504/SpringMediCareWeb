package com.ttkp.repositories;

import java.util.List;

public interface StatisticsRepository {

    List<Object[]> countPatientsByGender();

    List<Object[]> countPatientsByAgeGroup();

    List<Object[]> countPatientsBySpecialty();

    List<Object[]> countPatientsByDiagnosis();
}
