package com.mql.pojo;

/**
 * @author mql
 * @date 2018/12/21
 */
public class TbUser {
    /**
     * 用户id uuid
     */
    private String userId;
    /**
     * 性别  0 表示男 1 表示女 2 保密
     */
    private Integer sex;
    /**
     * 年龄
     */
    private Integer age;
    /**
     * 电话 唯一 使用电话进行登陆
     */
    private String phone;
    /**
     * 是否添加到黑名单 0 非 1 是
     */
    private Integer isBlock;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 密码 MD5加密
     */
    private String password;


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }


    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public Integer getIsBlock() {
        return isBlock;
    }

    public void setIsBlock(Integer isBlock) {
        this.isBlock = isBlock;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
