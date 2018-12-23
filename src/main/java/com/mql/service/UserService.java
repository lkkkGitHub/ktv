package com.mql.service;

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

}
