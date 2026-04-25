package com.ttkp.services.impl;

import com.ttkp.pojo.Drug;
import com.ttkp.repositories.DrugRepository;
import com.ttkp.services.DrugService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DrugServiceImpl implements DrugService {

    @Autowired
    private DrugRepository drugRepository;

    @Override
    public List<Drug> getDrugs() {
        return this.drugRepository.getDrugs();
    }

    @Override
    public Drug getDrugById(int id) {
        return this.drugRepository.getDrugById(id);
    }
}
