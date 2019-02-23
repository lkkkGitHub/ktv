package com.mql.dao;

import com.mql.pojo.TbClassify;

import java.util.List;

/**
 * @author mql
 * 2019/2/23 16:55
 */
public interface TbClassifyDao {
    List<TbClassify> selectAll();
}
