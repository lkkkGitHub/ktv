package com.mql.pojo;


public class TbStaff {

  private java.sql.Timestamp endTime;
  private Integer staffId;
  private String staffName;
  private Integer departId;
  private String phone;
  private java.sql.Timestamp startTime;
  private Integer isDimission;

//  连接查询部门
  private String departName;

  public String getDepartName() {
    return departName;
  }

  public void setDepartName(String departName) {
    this.departName = departName;
  }

  public java.sql.Timestamp getEndTime() {
    return endTime;
  }

  public void setEndTime(java.sql.Timestamp endTime) {
    this.endTime = endTime;
  }


  public Integer getStaffId() {
    return staffId;
  }

  public void setStaffId(Integer staffId) {
    this.staffId = staffId;
  }


  public String getStaffName() {
    return staffName;
  }

  public void setStaffName(String staffName) {
    this.staffName = staffName;
  }


  public Integer getDepartId() {
    return departId;
  }

  public void setDepartId(Integer departId) {
    this.departId = departId;
  }


  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }


  public java.sql.Timestamp getStartTime() {
    return startTime;
  }

  public void setStartTime(java.sql.Timestamp startTime) {
    this.startTime = startTime;
  }


  public Integer getIsDimission() {
    return isDimission;
  }

  public void setIsDimission(Integer isDimission) {
    this.isDimission = isDimission;
  }

}
