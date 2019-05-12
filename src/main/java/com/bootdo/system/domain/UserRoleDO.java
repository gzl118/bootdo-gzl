package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-18 22:28:52
 */
public class UserRoleDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 关联ID
	private String relateId;
	// 用户编号
	private String userId;
	// 角色ID
	private String roleId;
	// 用户名
	private String username;
	// 用户昵称
	private String usernikename;

	/**
	 * 设置：关联ID
	 */
	public void setRelateId(String relateId) {
		this.relateId = relateId;
	}

	/**
	 * 获取：关联ID
	 */
	public String getRelateId() {
		return relateId;
	}

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
	 * 设置：角色ID
	 */
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	/**
	 * 获取：角色ID
	 */
	public String getRoleId() {
		return roleId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsernikename() {
		return usernikename;
	}

	public void setUsernikename(String usernikename) {
		this.usernikename = usernikename;
	}
}
