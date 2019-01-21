package com.mql;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author mql
 * 2018/7/24 8:36
 * @description: springMybatis集成测试父类，提供测试类集成
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:applicationContext.xml"})
public class SpringMybatisTest {

    @Test
    public void test() {

    }
}
