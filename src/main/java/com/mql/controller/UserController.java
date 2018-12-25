package com.mql.controller;

import com.mql.pojo.TbUser;
import com.mql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

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
     * 登陆，使用ajax登陆；再login.jsp 91行
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
                return true;
            } else {
                return null;
            }
        } else {
            return false;
        }
    }
}
