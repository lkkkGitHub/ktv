package com.mql.dao;

import com.mql.pojo.TbStaff;

import java.util.List;

/**
 * @author mql
 * 2019/1/6 15:21
 */
public interface TbStaffDao {

    List<TbStaff> queryAll();
    Integer deleteById(int staffId);

    /**
     *员工录入
     * @param staff
     * @return
     */
    Integer addStaff(TbStaff staff);

    /**
     * 修改
     * @param staff
     * @return
     */
    Integer updateById(TbStaff staff);

    /**
     * 根据姓名查找
     * @param staffName
     * @return
     */
    List<TbStaff> queryByName(String staffName);
}
