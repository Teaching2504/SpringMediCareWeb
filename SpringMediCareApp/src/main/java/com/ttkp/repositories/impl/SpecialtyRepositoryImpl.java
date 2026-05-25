package com.ttkp.repositories.impl;

import com.ttkp.pojo.Specialty;
import com.ttkp.repositories.SpecialtyRepository;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class SpecialtyRepositoryImpl implements SpecialtyRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Specialty> getSpecialties() {
        Session session = this.factory.getObject().getCurrentSession();
        return session.createNamedQuery("Specialty.findAll", Specialty.class).getResultList();
    }

    @Override
    public Specialty getSpecialtyById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.get(Specialty.class, id);
    }
}