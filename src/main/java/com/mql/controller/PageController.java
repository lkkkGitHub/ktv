package com.mql.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 进行jsp页面跳转
 *
 * @author mql
 * 2018/12/24 11:53
 */
@Controller
public class PageController {

    /**
     * 跳转页面  前台只要 “/login” 就能跳转到login.jsp
     *
     * @param page 返回页面的名字
     * @return 页面
     */
    @RequestMapping("/{page}")
    public String page(@PathVariable(value = "page") String page) {
        return page;
    }

    /**
     * 没有传值则直接跳到主页
     *
     * @return 主页
     */
    @RequestMapping("/")
    public String pageLogin() {
        return "index";
    }
}
