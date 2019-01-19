package com.mql.dao;

import com.mql.pojo.TbCompartment;

import java.util.List;

/**
 * @author mql
 * @date 2018/1/13
 */
public interface TbCompartmentDao {

    int insert(TbCompartment pojo);

    int update(TbCompartment pojo);

    /**
     * 获取包房名字，和上午的预定状态
     *
     * @return
     */
    List<TbCompartment> getStateForenoon();

    /**
     * 获取包房名字，和下午的预定状态
     *
     * @return
     */
    List<TbCompartment> getStateAfternoon();

    /**
     * 获取包房名字，和晚上预定状态
     *
     * @return
     */
    List<TbCompartment> getStateEvening();

    /**
     * 用户预定上午场状态
     *
     * @param compartmentId
     * @param userId
     */
    void destineForenoon(String userId, String compartmentId);

    /**
     * 用户预定下午场状态
     *
     * @param compartmentId
     * @param userId
     */
    void destineAfternoon(String userId, String compartmentId);

    /**
     * 用户预定晚场状态
     *
     * @param compartmentId
     * @param userId
     */
    void destineEvening(String userId, String compartmentId);

    /**
     * 获取用户预定的上午包房信息
     *
     * @param userId
     * @return
     */
    List<TbCompartment> getDestineForenoon(String userId);

    /**
     * 获取用户预定的下午包房信息
     *
     * @param userId
     * @return
     */
    List<TbCompartment> getDestineAfternoon(String userId);

    /**
     * 获取用户预定的晚场包房信息
     *
     * @param userId
     * @return
     */
    List<TbCompartment> getDestineEvening(String userId);

    /**
     * 取消预定上午场信息
     *
     * @param userId
     * @param compartmentId
     */
    void cancelDestineForenoon(String userId, String compartmentId);

    /**
     * 取消预定下午场
     *
     * @param userId
     * @param compartmentId
     */
    void cancelDestineAfternoon(String userId, String compartmentId);

    /**
     * 取消预定晚上场
     *
     * @param userId
     * @param compartmentId
     */
    void cancelDestineEvening(String userId, String compartmentId);
}
