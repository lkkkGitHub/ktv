package com.mql.pojo;

import java.sql.Timestamp;

/**
 * @author mql
 * @date 21019/01/21
 */
public class TbMusic {

    private Integer id;
    private String musicName;
    private java.sql.Timestamp time;
    private String musicStr;
    private Integer songerId;
    private String songerName;
    private String special;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMusicName() {
        return musicName;
    }

    public void setMusicName(String musicName) {
        this.musicName = musicName;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getMusicStr() {
        return musicStr;
    }

    public void setMusicStr(String musicStr) {
        this.musicStr = musicStr;
    }

    public Integer getSongerId() {
        return songerId;
    }

    public void setSongerId(Integer songerId) {
        this.songerId = songerId;
    }

    public String getSongerName() {
        return songerName;
    }

    public void setSongerName(String songerName) {
        this.songerName = songerName;
    }

    public String getSpecial() {
        return special;
    }

    public void setSpecial(String special) {
        this.special = special;
    }
}
