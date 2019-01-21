package com.mql.service;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;
import com.mql.pojo.TbMusic;
import com.mql.dao.TbMusicDao;

/**
 * @author mql
 * @date 2019/01/21 21:59
 */
@Service
public class MusicService{

    @Resource
    private TbMusicDao tbMusicDao;


}
