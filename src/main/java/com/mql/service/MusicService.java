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
public class MusicService {

    @Resource
    private TbMusicDao tbMusicDao;

    public TbMusic getMusic(Integer musicId) {
        return tbMusicDao.getMusic(musicId);
    }

    public List<TbMusic> selectAll() {
        return tbMusicDao.selectAll();
    }

    public List<TbMusic> search(String musicName) {
        return tbMusicDao.search(musicName);
    }
    public List<TbMusic> musicList(Integer classifyId){
        return tbMusicDao.musicList(classifyId);
    }
}
