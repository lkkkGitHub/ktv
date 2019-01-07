package com.mql.pojo;


public class TbMusic {

  private Integer musicId;
  private String musicName;
  private java.sql.Timestamp time;
  private String musicUrl;
  private Integer songerId;


  public Integer getMusicId() {
    return musicId;
  }

  public void setMusicId(Integer musicId) {
    this.musicId = musicId;
  }


  public String getMusicName() {
    return musicName;
  }

  public void setMusicName(String musicName) {
    this.musicName = musicName;
  }


  public java.sql.Timestamp getTime() {
    return time;
  }

  public void setTime(java.sql.Timestamp time) {
    this.time = time;
  }


  public String getMusicUrl() {
    return musicUrl;
  }

  public void setMusicUrl(String musicUrl) {
    this.musicUrl = musicUrl;
  }


  public Integer getSongerId() {
    return songerId;
  }

  public void setSongerId(Integer songerId) {
    this.songerId = songerId;
  }

}
