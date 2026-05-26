package com.ttkp.repositories.impl;

import com.ttkp.pojo.Drug;
import com.ttkp.repositories.DrugRepository;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class DrugRepositoryImpl implements DrugRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Drug> getDrugs() {
        Session session = this.factory.getObject().getCurrentSession();
        return session.createNamedQuery("Drug.findAll", Drug.class).getResultList();
    }

    @Override
    public Drug getDrugById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Drug.class, id);
    }

    @Override
    public boolean addOrUpdateDrug(Drug drug) {
        Session session = this.factory.getObject().getCurrentSession();

        if (drug.getDrugId() == null) {
            session.persist(drug);
        } else {
            session.merge(drug);
        }

        return true;
    }

    @Override
    public boolean deleteDrug(int id) {
        Session session = this.factory.getObject().getCurrentSession();

        Drug d = session.get(Drug.class, id);
        if (d != null) {
            session.remove(d);
            return true;
        }

        return false;
    }
}
