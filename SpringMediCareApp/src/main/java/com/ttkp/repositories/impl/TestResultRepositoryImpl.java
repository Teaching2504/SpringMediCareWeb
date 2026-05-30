package com.ttkp.repositories.impl;

import com.ttkp.pojo.TestResult;
import com.ttkp.repositories.TestResultRepository;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class TestResultRepositoryImpl implements TestResultRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<TestResult> getTestResultsByRecordId(int recordId) {
        Session session = this.factory.getObject().getCurrentSession();

        Query<TestResult> q = session.createNamedQuery(
                "TestResult.findByRecordId",
                TestResult.class
        );

        q.setParameter("recordId", recordId);

        return q.getResultList();
    }

    @Override
    public void addTestResult(TestResult testResult) {
        Session session = this.factory.getObject().getCurrentSession();
        session.persist(testResult);
    }
}
