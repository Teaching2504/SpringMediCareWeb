package com.ttkp.repositories.impl;

import com.ttkp.pojo.Drug;
import com.ttkp.repositories.DrugRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.hibernate.query.Query;
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
    public List<Drug> getDrugs(Map<String, String> params) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Drug> q = b.createQuery(Drug.class);
        Root root = q.from(Drug.class);
        q.select(root);

        if (params != null && !params.isEmpty()) {
            List<Predicate> predicates = new ArrayList<>();

            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                predicates.add(b.like(root.get("name"), String.format("%%%s%%", kw.trim())));
            }

            String categoryId = params.get("categoryId");
            if (categoryId != null && !categoryId.isEmpty()) {
                predicates.add(b.equal(root.get("categoryId").get("categoryId").as(Integer.class), Integer.parseInt(categoryId)));
            }

            if (!predicates.isEmpty()) {
                q.where(predicates.toArray(Predicate[]::new));
            }
        }

        q.orderBy(b.desc(root.get("drugId")));

        Query query = session.createQuery(q);
        return query.getResultList();
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
