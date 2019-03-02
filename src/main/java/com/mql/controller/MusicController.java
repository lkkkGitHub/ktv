package com.mql.controller;

import com.mql.pojo.TbMusic;
import com.mql.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.LinkedList;
import java.util.List;

/**
 * @author mql
 * 2019/1/21 22:01
 */
@Controller
@RequestMapping("/music")
public class MusicController {

    @Autowired
    private MusicService musicService;

    /**
     * 获取音乐列表
     *
     * @param session
     * @return
     */
    private LinkedList<TbMusic> getMusicList(HttpSession session) {
        LinkedList<TbMusic> musicList = (LinkedList<TbMusic>) session.getAttribute("musicList");
        if (musicList == null) {
            musicList = new LinkedList<>();
        }
        return musicList;
    }

    /**
     * 获取点歌列表
     *
     * @param session
     * @return
     */
    @RequestMapping("/getMusics")
    public String getMusics(HttpSession session) {
        LinkedList<TbMusic> musics = getMusicList(session);
        session.setAttribute("musicList", musics);
        return "playMusic";
    }

    /**
     * 点歌
     *
     * @param session
     * @param musicId 音乐id
     */
    @RequestMapping("/addMusicList")
    public String addMusicList(HttpSession session, Integer musicId) {
        LinkedList<TbMusic> musicList = getMusicList(session);
        musicList.addLast(musicService.getMusic(musicId));
        session.setAttribute("musicList", musicList);
        return "redirect:getMusics";
    }

    /**
     * 修改点歌列表中的歌曲顺序
     *
     * @param session 获取点歌列表
     * @param flag    0 表示“上移动一格”， 1 表示 “下移动一格” 2 表示 “置顶”
     * @param index   表示需要移动的歌曲当前所在的位置
     */
    @RequestMapping("/moveMusicList")
    public String moveMusicList(HttpSession session, Integer flag, int index) {
        LinkedList<TbMusic> musicList = getMusicList(session);
        if (musicList.size() <= 1) {
            return "redirect:getMusics";
        }
        TbMusic music = musicList.get(index);
        TbMusic musicToSwap;
        if (flag == 0 && index > 1) {
            musicList.remove(index);
            musicToSwap = musicList.get(--index);
            musicList.remove(index);
            musicList.add(index, music);
            musicList.add(++index, musicToSwap);
        } else if (flag == 1 && index != musicList.size() - 1) {
            musicToSwap = musicList.get(index + 1);
            musicList.remove(index);
            musicList.remove(index);
            musicList.add(index, musicToSwap);
            musicList.add(index + 1, music);
        } else if (flag == 2 && index > 1) {
            musicList.remove(index);
            musicList.add(1, music);
        }
        return "redirect:getMusics";
    }

    /**
     * 切歌，或者播放完了
     *
     * @param session
     */
    @RequestMapping("/cutMusicList")
    public String cutMusicList(HttpSession session) {
        LinkedList<TbMusic> musicList = getMusicList(session);
        if (musicList.size() == 0) {
            return "redirect:getMusics";
        }
        musicList.removeFirst();
        return "redirect:getMusics";
    }

    /**
     * 删除列表中的歌曲
     *
     * @param session
     * @param index
     * @return
     */
    @RequestMapping("/remove")
    public String remove(HttpSession session, int index) {
        LinkedList<TbMusic> musicList = getMusicList(session);
        musicList.remove(index);
        return "redirect:getMusics";
    }

    /**
     * 查询所有歌曲
     *
     * @param session
     */
    @RequestMapping("/queryAll")
    public String queryAll(HttpSession session) {
        List<TbMusic> musicList = musicService.selectAll();
        session.setAttribute("AllMusic", musicList);
        return "AllMusic";
    }

    /**
     * 歌曲查找
     *
     * @param session
     * @return
     */
    @RequestMapping("/search")
    public String search(HttpSession session, String musicName) {
        List<TbMusic> musicList = musicService.search(musicName);
        session.setAttribute("AllMusic", musicList);
        return "AllMusic";
    }

    /**
     *
     * @param session
     * @param classifyId
     * @return
     */
    @RequestMapping("/musicList")
    public String musicList(HttpSession session, Integer classifyId) {
        List<TbMusic> musics = musicService.musicList(classifyId);
        session.setAttribute("AllMusic", musics);
        return "AllMusic";
    }
}
