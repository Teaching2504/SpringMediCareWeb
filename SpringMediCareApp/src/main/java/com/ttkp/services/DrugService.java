package com.ttkp.services;

import com.ttkp.pojo.Drug;
import java.util.List;

public interface DrugService {

    List<Drug> getDrugs();

    Drug getDrugById(int id);
}
