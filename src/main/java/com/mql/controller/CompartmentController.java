package com.mql.controller;

import com.mql.pojo.TbCompartment;
import com.mql.pojo.TbUser;
import com.mql.service.CompartmentService;
import com.mql.until.TimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @author mql
 * 2019/1/13 14:31
 */
@Controller
@RequestMapping("/compartment")
public class CompartmentController {

    @Autowired
    private CompartmentService compartmentService;

    /**
     * 获取时间端内的所有包房预定状态信息
     *
     * @param request
     * @param period  相对应的时间段： 0 表示上午 1 表示下午 2 表示晚上
     * @return
     */
    @RequestMapping("/getState")
    public String getState(HttpServletRequest request, HttpSession session,
                           @RequestParam(required = false) Integer period) {
        if (period == null) {
            period = (Integer) session.getAttribute("period");
            if (period == null) {
                period = 0;
            }
        }
        List<TbCompartment> list = compartmentService.getState(period);
        request.setAttribute("compartmentList", list);
        session.setAttribute("period", period);
        return "destine";
    }

    /**
     * 查询用户预定的所有包房
     *
     * @param session
     * @return
     */
    @ResponseBody
    @RequestMapping("/verifyDestine")
    public Map<Integer, List<TbCompartment>> verifyUserDestine(HttpSession session) {
        return compartmentService.verifyDestine(((TbUser) session.getAttribute("user")).getUserId());
    }

    /**
     * 用户预定包房
     *
     * @param session
     * @param compartmentId
     * @return
     */
    @RequestMapping("/destine")
    public String destine(HttpSession session, String compartmentId, HttpServletRequest request) {
        Integer period = (Integer) session.getAttribute("period");
        if (period < TimeUtils.judgeTime()) {
            request.setAttribute("overTime", "预定的时间段已经过去，早一点来把");
            return "forward:getState";
        }
        compartmentService.destine(((TbUser) session.getAttribute("user")).getUserId(),
                period, compartmentId);
        return "redirect:getState";
    }

    /**
     * 清除period session中记录
     *
     * @param session
     * @return
     */
    @RequestMapping("/return")
    public String returnIndex(HttpSession session) {
        session.removeAttribute("period");
        return "index";
    }

    /**
     * 判断用户在当时间段内是否预定了包房
     *
     * @param session
     * @return 预定了返回true，否false
     */
    @RequestMapping("/judgeDestineTime")
    public String judgeDestineTime(HttpSession session, HttpServletRequest request) {
        Map<Integer, List<TbCompartment>> destineMap = compartmentService.verifyDestine(((TbUser) session.getAttribute("user")).getUserId());
        if (destineMap.get(TimeUtils.judgeTime()).size() != 0) {
            return "musicIndex";
        } else {
            request.setAttribute("noDestine", "你还没有预定包房、或者不再预定的时间段内");
            return "index";
        }
    }

    /**
     * 用户取消预定包房
     *
     * @param session       获取用户预定包房的时间段，以及用户id
     * @param compartmentId 包房id
     * @return
     */
    @RequestMapping("/cancelDestine")
    public String cancelDestine(HttpSession session, String compartmentId) {
        compartmentService.cancelDestine(((TbUser) session.getAttribute("user")).getUserId(),
                (Integer) session.getAttribute("period"), compartmentId);
        return "redirect:getState";
    }
}
