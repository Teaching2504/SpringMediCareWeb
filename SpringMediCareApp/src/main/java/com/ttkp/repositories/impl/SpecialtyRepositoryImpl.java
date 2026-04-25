package com.ttkp.repositories.impl;

import com.ttkp.configs.HibernateUtils;
import com.ttkp.pojo.Specialty;
import com.ttkp.repositories.SpecialtyRepository;
import java.util.List;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

@Repository
public class SpecialtyRepositoryImpl implements SpecialtyRepository {

    @Override
    public List<Specialty> getSpecialties() {
        try (Session session = HibernateUtils.getFactory().openSession()) {
            return session.createNamedQuery("Specialty.findAll", Specialty.class).getResultList();
        }
    }

    @Override
    public Specialty getSpecialtyById(int id) {
        try (Session session = HibernateUtils.getFactory().openSession()) {
            return session.get(Specialty.class, id);
        }
    }
}