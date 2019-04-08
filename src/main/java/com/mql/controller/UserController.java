package com.mql.controller;

import com.mql.pojo.TbUser;
import com.mql.service.UserService;
import com.mql.until.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.UUID;

/**
 * @author mql
 * 2018/12/23 19:51
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 登陆，使用ajax登陆，login.jsp 91行
     * 账号密码都正确service会返回一个TbUser对象，错误即返回null；如果在黑名单中
     * 会返回一个null给前台，前台ajax中进行判断；
     *
     * @return true则登陆成功，跳转页面；false账号密码错误，null 在黑名单中
     */
    @ResponseBody
    @PostMapping(value = "/login")
    public Boolean login(String phone, String passWord, HttpSession session) {
        TbUser user = userService.login(phone, passWord);
        if (user != null) {
            if (user.getIsBlock() == 0) {
                session.setAttribute("user", user);
                session.setMaxInactiveInterval(30 * 60);
                return true;
            } else {
                return null;
            }
        } else {
            return false;
        }
    }

    /**
     * 判断用户名是否存在
     *
     * @param name 用户名
     * @return 存在返回false 不存在返回true
     */
    @ResponseBody
    @PostMapping("/verifyName")
    public Boolean verifyName(String name) {
        return userService.verifyName(name);
    }

    /**
     * 判断手机号码是否存在
     *
     * @param phone 手机号码
     * @return 存在返回false 不存在返回true
     */
    @ResponseBody
    @PostMapping("/verifyPhone")
    public Boolean verifyPhone(String phone) {
        return userService.verifyPhone(phone);
    }
    /**
     * 注册写入数据库 uid, uname, password, email, phone, sex(0男，1女，2保密）,
     * image,status(0false:删除 ，1true存在), VIP（0 非，1是）
     *
     * @return
     */
    @ResponseBody
    @PostMapping("/register")
    public Boolean register(TbUser user) {
        user.setUserId(UUID.randomUUID().toString().replace("-", "").toLowerCase());
        user.setPassword(MD5Utils.md5(user.getPassword()));
        return userService.register(user);
    }

    /**
     * 查询所有用户
     * @return
     */
    @RequestMapping("/findAll")
    public String findAll(HttpServletRequest request){
        List<TbUser> tbUsers = userService.findAll();
        request.getSession().setAttribute("tbUsers",tbUsers);
        return "userType";
    }

    /**
     * 删除
     * @param phone
     * @return
     */
    @RequestMapping("/deleteByPhone")
    public String delete(String phone){
        userService.deleteByPhone(phone);
        return "redirect:findAll";
    }
    @RequestMapping("/updateByPhone")
    public String update(TbUser user){
        userService.updateByPhone(user);
        return "redirect:findAll";
    }

    @RequestMapping("/updateUser")
    public String updateUser(String phone, HttpServletRequest request) {
        request.setAttribute("phone", phone);
        return "updateUser";
    }

    /**
     * 用户修改信息
     * @param user
     * @return
     */
    @RequestMapping("updateById")
    public String updateById(TbUser user){
        userService.updateById(user);
        return "musicIndex";
    }
    @RequestMapping("/redirect")
    public String redirect(){
        return "Personal";
    }
}
