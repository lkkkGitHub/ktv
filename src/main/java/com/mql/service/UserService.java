package com.mql.service;

import com.mql.until.MD5Utils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import com.mql.pojo.TbUser;
import com.mql.dao.TbUserDao;

import java.util.List;

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

    /**
     * 判断用户名是否已经存在
     *
     * @param name 用户名
     * @return 存在返回false 不存在返回true
     */
    public Boolean verifyName(String name) {
        return tbUserDao.findCountByName(name) == 0;
    }

    /**
     * 判断手机号码是否存在
     *
     * @param phone 手机号号码
     * @return 存在返回false，不 true
     */
    public Boolean verifyPhone(String phone) {
        return tbUserDao.findCountByPhone(phone) == 0;
    }

    /**
     * 注册，写入数据库，保证用户名，电话号码唯一，密码加密
     *
     * @param tbUser 用户信息
     * @return 成功返回true
     */
    public Boolean register(TbUser tbUser) {
        int flag = tbUserDao.insertSelective(tbUser);
        if (flag != 1) {
            return false;
        }
        return true;
    }

    /**
     * 查询所有用户
     * @return
     */
    public List<TbUser> findAll(){
    return tbUserDao.findAll();
    }

    /**
     * 根据电话删除
     * @param phone
     * @return
     */
    public int deleteByPhone(String phone){
        if(phone==null){
            return -1;
        }else{
            return tbUserDao.deleteByPhone(phone);
        }
    }

    /**
     * 修改
     * @param user
     * @return
     */
    public  int  updateByPhone(TbUser user){
        return tbUserDao.updateByPhone(user);
    }
}
