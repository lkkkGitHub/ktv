package com.mql.service;

import com.mql.dao.TbClassifyDao;
import com.mql.pojo.TbClassify;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author mql
 * 2019/2/23 16:59
 */@Service
public class ClassifyService {
     @Resource
    private TbClassifyDao tbClassifyDao;
     public List<TbClassify> selectAll(){
         return  tbClassifyDao.selectAll();
     }
}
