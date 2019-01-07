package com.mql.controller;

import com.mql.pojo.TbStaff;
import com.mql.service.StaffService;
import com.mql.until.TimeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author mql
 * 2019/1/6 15:27
 */
@Controller
@RequestMapping("/staff")
public class StaffController {
    @Resource
    private StaffService staffService;

    /**
     * 查询所有员工
     * @param request
     * @return
     */
    @RequestMapping("/queryStaff")
    public String queryAll(HttpServletRequest request){
        List<TbStaff> tbStaffs= staffService.queryAll();
        request.setAttribute("tbStaffs",tbStaffs);
        return  "staffType";
    }

    /**
     * 根据Id删除员工
     * @param staffId
     * @return
     */
    @RequestMapping("/deleteById")
    public String deleteById(Integer staffId){
       staffService.deleteById(staffId) ;
       return "redirect:staffType";
    }

    /**
     * 员工录入
     * @param staff
     * @return
     */
    @PostMapping("/addStaff")
    public String addStaff(TbStaff staff){
      staff.setStartTime(TimeUtils.getNowTimestamp());
        staffService.addStaff(staff);
        return "addStaff";
    }

    /**
     * 修改
     * @param staff
     * @return
     */
    @RequestMapping("/updateStaff")
    public  String updateStaff(TbStaff staff){
        staffService.update(staff);
        return "redirect:queryStaff";
    }
    @RequestMapping("update")
    public String update(Integer staffId,HttpServletRequest request){
        request.setAttribute("staffId",staffId);
        return "updateStaff";
    }

}
