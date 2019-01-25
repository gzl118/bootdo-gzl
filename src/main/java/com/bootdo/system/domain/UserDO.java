package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

public class UserDO implements Serializable {
	private static final long serialVersionUID = 1L;
	// 用户编号
	private String userId;
	// 部门编号
	private String deptId;
	// 用户名
	private String username;
	// 用户昵称
	private String usernikename;
	// 用户密码
	private String userpwd;
	// 用户状态，1正常，0停用
	private Integer userstatus;
	// 编辑人
	private String editUser;
	// 编辑时间
	private Date editTime;
	// 删除标识，1未删除，2删除
	private Integer deleteflag;
	// 备注
	private String ext1;
	// 备注
	private String ext2;
	// 备注
	private String ext3;

	/**
	 * 设置：用户编号
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * 获取：用户编号
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * 设置：部门编号
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	/**
	 * 获取：部门编号
	 */
	public String getDeptId() {
		return deptId;
	}

	/**
	 * 设置：用户名
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * 获取：用户名
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * 设置：用户昵称
	 */
	public void setUsernikename(String usernikename) {
		this.usernikename = usernikename;
	}

	/**
	 * 获取：用户昵称
	 */
	public String getUsernikename() {
		return usernikename;
	}

	/**
	 * 设置：用户密码
	 */
	public void setUserpwd(String userpwd) {
		this.userpwd = userpwd;
	}

	/**
	 * 获取：用户密码
	 */
	public String getUserpwd() {
		return userpwd;
	}

	/**
	 * 设置：用户状态，1正常，0停用
	 */
	public void setUserstatus(Integer userstatus) {
		this.userstatus = userstatus;
	}

	/**
	 * 获取：用户状态，1正常，0停用
	 */
	public Integer getUserstatus() {
		return userstatus;
	}

	/**
	 * 设置：编辑人
	 */
	public void setEditUser(String editUser) {
		this.editUser = editUser;
	}

	/**
	 * 获取：编辑人
	 */
	public String getEditUser() {
		return editUser;
	}

	/**
	 * 设置：编辑时间
	 */
	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}

	/**
	 * 获取：编辑时间
	 */
	public Date getEditTime() {
		return editTime;
	}

	/**
	 * 设置：删除标识，1未删除，2删除
	 */
	public void setDeleteflag(Integer deleteflag) {
		this.deleteflag = deleteflag;
	}

	/**
	 * 获取：删除标识，1未删除，2删除
	 */
	public Integer getDeleteflag() {
		return deleteflag;
	}

	/**
	 * 设置：备注
	 */
	public void setExt1(String ext1) {
		this.ext1 = ext1;
	}

	/**
	 * 获取：备注
	 */
	public String getExt1() {
		return ext1;
	}

	/**
	 * 设置：备注
	 */
	public void setExt2(String ext2) {
		this.ext2 = ext2;
	}

	/**
	 * 获取：备注
	 */
	public String getExt2() {
		return ext2;
	}

	/**
	 * 设置：备注
	 */
	public void setExt3(String ext3) {
		this.ext3 = ext3;
	}

	/**
	 * 获取：备注
	 */
	public String getExt3() {
		return ext3;
	}
}
