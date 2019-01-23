package com.mql.dao;


import com.mql.pojo.TbMusic;

/**
 * @author mql
 * @date 2019/01/21 21:59
 */
public interface TbMusicDao {

    /**
     * 获取歌曲的详细信息以及歌手名
     *
     * @param musicId 歌曲id
     * @return
     */
    TbMusic getMusic(Integer musicId);
}
