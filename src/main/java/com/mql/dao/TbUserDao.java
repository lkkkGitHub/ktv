package com.mql.dao;


import com.mql.pojo.TbUser;

import java.util.List;

/**
 * @author mql
 * @date 2018/12/12
 */
public interface TbUserDao {
    /**
     * 根据用户手机号，查询用户的信息，进行登陆黑名单验证
     *
     * @param phone 电话号码
     * @return 用户信息
     */
    TbUser findUserByPhone(String phone);

    /**
     * 根据用户名，查询用户名是否存在
     *
     * @param name 注册时用户输入的用户名
     * @return 存在返回 1 不存在 0
     */
    Integer findCountByName(String name);

    /**
     * 根据手机号号，查询手机号是否已经注册
     *
     * @param phone 手机号
     * @return 存在返回 1 不存在返回 0
     */
    Integer findCountByPhone(String phone);

    /**
     * 注册
     *
     * @param user 注册信息
     * @return 影响行数
     */
    Integer insertSelective(TbUser user);

    /**
     * 查询所有用户
     * @return
     */
    List<TbUser> findAll();

}
