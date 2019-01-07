package com.mql.service;

import com.mql.dao.TbStaffDao;
import com.mql.pojo.TbStaff;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author mql
 * 2019/1/6 15:23
 */
@Service
public class StaffService {
    @Resource
    private TbStaffDao tbStaffDao;

    /**
     * 查询
     * @return
     */
    public List<TbStaff> queryAll(){
        return tbStaffDao.queryAll();
    }

    /**
     * 删除
     * @param staffId
     * @return
     */
    public int  deleteById(Integer staffId){
        if(staffId==null){
            return -1;
        }else{
            return tbStaffDao.deleteById(staffId);
        }
    }

    /**
     * 录入
     * @param staff
     * @return
     */
    public int addStaff(TbStaff staff) {
        return tbStaffDao.addStaff(staff);
    }

    /**
     * 修改
     * @param staff
     * @return
     */
    public  int update(TbStaff staff){
        return  tbStaffDao.updateById(staff);
    }
}
