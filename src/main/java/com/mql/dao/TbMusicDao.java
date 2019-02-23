package com.mql.dao;


import com.mql.pojo.TbMusic;

import java.util.List;

/**
 * @author mql
 * @date 2019/01/21 21:59
 */
public interface TbMusicDao {

    /**
     * 获取歌曲的详细信息以及歌手名
     *
     * @param id 歌曲id
     * @return
     */
    TbMusic getMusic(Integer id);

    /**
     * 查找所有歌曲
     * @return
     */
    List<TbMusic> selectAll();

    /**
     * 歌名查找
     * @param musicName
     * @return
     */
    List<TbMusic> search(String musicName);

    /**
     * 分类歌曲
     * @param classifyId
     * @return
     */

    List<TbMusic> musicList(Integer classifyId);
}
