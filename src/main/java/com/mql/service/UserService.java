package com.mql.service;

import com.mql.until.MD5Utils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

import com.mql.pojo.TbUser;
import com.mql.dao.TbUserDao;

/**
 * @author mql
 * @date 2018/12/12
 */
@Service
public class UserService {

    @Resource
    private TbUserDao tbUserDao;

    /**
     * 登陆service，密码使用md5加密传输到数据库保存，所以比较密码的时候需要将用户输入的密码
     * 使用md5加密再与数据库查出来的数据进行比较
     *
     * @param phone    电话号码
     * @param passWord 密码
     * @return 账号密码都正确即返回TbUser对象，错误或者用户不存在 返回null
     */
    public TbUser login(String phone, String passWord) {
        TbUser user = tbUserDao.findUserByPhone(phone);
        if (user == null) {
            return null;
        } else {
            if (user.getPassword().equals(MD5Utils.md5(passWord))) {
                return user;
            } else {
                return null;
            }
        }
    }
}
