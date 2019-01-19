package com.mql.service;

import com.mql.pojo.TbCompartment;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mql.dao.TbCompartmentDao;

/**
 * @author mql
 * @date 2018/1/13
 */
@Service
public class CompartmentService {

    @Resource
    private TbCompartmentDao tbCompartmentDao;

    /**
     * 获取相应时间端内包房的预定信息
     *
     * @param period
     * @return
     */
    public List<TbCompartment> getState(Integer period) {
        List<TbCompartment> list = null;
        if (period == 0) {
            list = tbCompartmentDao.getStateForenoon();
        } else if (period == 1) {
            list = tbCompartmentDao.getStateAfternoon();
        } else {
            list = tbCompartmentDao.getStateEvening();
        }
        return list;
    }

    /**
     * 用户预定时间段内的包房
     *
     * @param userId
     * @param period
     */
    public void destine(String userId, Integer period, String compartmentId) {
        if (period == 0) {
            tbCompartmentDao.destineForenoon(userId, compartmentId);
        } else if (period == 1) {
            tbCompartmentDao.destineAfternoon(userId, compartmentId);
        } else {
            tbCompartmentDao.destineEvening(userId, compartmentId);
        }
    }

    /**
     * 获取用户所有的预定信息
     *
     * @param usreId
     * @return
     */
    public Map<Integer, List<TbCompartment>> verifyDestine(String usreId) {
        Map<Integer, List<TbCompartment>> map = new HashMap<>(5, 1);
        map.put(0, tbCompartmentDao.getDestineForenoon(usreId));
        map.put(1, tbCompartmentDao.getDestineAfternoon(usreId));
        map.put(2, tbCompartmentDao.getDestineEvening(usreId));
        return map;
    }

    /**
     * 用户取消预定
     *
     * @param userId
     * @param period
     * @param compartmentId
     */
    public void cancelDestine(String userId, Integer period, String compartmentId) {
        if (period == 0) {
            tbCompartmentDao.cancelDestineForenoon(userId, compartmentId);
        } else if (period == 1) {
            tbCompartmentDao.cancelDestineAfternoon(userId, compartmentId);
        } else {
            tbCompartmentDao.cancelDestineEvening(userId, compartmentId);
        }
    }
}
