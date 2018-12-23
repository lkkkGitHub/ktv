package com.mql.controller;

import com.mql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author mql
 * 2018/12/23 19:51
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


}
