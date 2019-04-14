package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-06 20:59:44
 */
public class UserStaffDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 关联ID
	private String relateId;
	// 员工编号
	private String employeeId;
	// 用户编号
	private String userId;

	private String employeename;

	public String getEmployeename() {
		return employeename;
	}

	public void setEmployeename(String employeename) {
		this.employeename = employeename;
	}

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
	 * 设置：员工编号
	 */
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	/**
	 * 获取：员工编号
	 */
	public String getEmployeeId() {
		return employeeId;
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
}
