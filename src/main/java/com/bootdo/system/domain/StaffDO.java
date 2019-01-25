package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * @author wwpan
 * @email 1992lcg@163.com
 * @date 2018-10-16 10:36:57
 */
public class StaffDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long staffId;
	//
	private String name;
	//
	private Long sex;
	//
	private Date staffIdCreate;
	//
	private Date staffIdModified;
	//
	private Long deptId;
	
	private String deptName;
	//
	private String education;
	//
	private String zc;
	//
	private String zw;

	/**
	 * 设置：
	 */
	public void setStaffId(Long staffId) {
		this.staffId = staffId;
	}
	/**
	 * 获取：
	 */
	public Long getStaffId() {
		return staffId;
	}
	/**
	 * 设置：
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：
	 */
	public void setSex(Long sex) {
		this.sex = sex;
	}
	/**
	 * 获取：
	 */
	public Long getSex() {
		return sex;
	}
	/**
	 * 设置：
	 */
	public void setStaffIdCreate(Date staffIdCreate) {
		this.staffIdCreate = staffIdCreate;
	}
	/**
	 * 获取：
	 */
	public Date getStaffIdCreate() {
		return staffIdCreate;
	}
	/**
	 * 设置：
	 */
	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：
	 */
	public Long getDeptId() {
		return deptId;
	}
	/**
	 * 设置：
	 */
	public void setEducation(String education) {
		this.education = education;
	}
	/**
	 * 获取：
	 */
	public String getEducation() {
		return education;
	}
	/**
	 * 设置：
	 */
	public void setZc(String zc) {
		this.zc = zc;
	}
	/**
	 * 获取：
	 */
	public String getZc() {
		return zc;
	}
	/**
	 * 设置：
	 */
	public void setZw(String zw) {
		this.zw = zw;
	}
	/**
	 * 获取：
	 */
	public String getZw() {
		return zw;
	}
	public Date getStaffIdModified() {
		return staffIdModified;
	}
	public void setStaffIdModified(Date staffIdModified) {
		this.staffIdModified = staffIdModified;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
}
