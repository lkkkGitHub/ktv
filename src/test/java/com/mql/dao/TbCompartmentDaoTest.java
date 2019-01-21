package com.mql.dao;

import com.mql.SpringMybatisTest;
import com.mql.pojo.TbCompartment;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;


/**
 * @author mql
 * 2019/1/13 14:35
 */
public class TbCompartmentDaoTest extends SpringMybatisTest {

    @Autowired
    TbCompartmentDao tbCompartmentDao;

    @Test
    public void insert() {
        TbCompartment tbCompartment = new TbCompartment();
        for (int i = 0; i < 6; i++) {
            tbCompartment.setCompartmentId(UUID.randomUUID().toString().replace("-", "").toLowerCase());
            tbCompartment.setCompartmentName("包房" + (i + 1));
            tbCompartmentDao.insert(tbCompartment);
        }
    }
}