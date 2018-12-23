package com.mql.dao;



import com.mql.pojo.TbUser;

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
}
