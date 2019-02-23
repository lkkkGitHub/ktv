package com.mql.controller;

import com.mql.pojo.TbClassify;
import com.mql.service.ClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author mql
 * 2019/2/23 17:03
 */
@Controller
@RequestMapping("/classify")
public class ClassifyController {
    @Autowired
    private ClassifyService classifyService;

    @RequestMapping("/selectAll")
    public String selecAll(HttpServletRequest request) {
        List<TbClassify> tbClassifies = classifyService.selectAll();
        request.getSession().setAttribute("AllClassify", tbClassifies);
        return "musicIndex";
    }
}
