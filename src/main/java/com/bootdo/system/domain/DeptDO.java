package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 部门管理
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-09-27 14:28:36
 */
public class DeptDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 部门编号
	private String deptId;
	// 部门名称
	private String deptname;
	// 描述
	private String deptdesc;
	// 父级编号
	private String parentId;
	// 顺序
	private Integer ordernum;
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
	 * 设置：部门名称
	 */
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}

	/**
	 * 获取：部门名称
	 */
	public String getDeptname() {
		return deptname;
	}

	/**
	 * 设置：描述
	 */
	public void setDeptdesc(String deptdesc) {
		this.deptdesc = deptdesc;
	}

	/**
	 * 获取：描述
	 */
	public String getDeptdesc() {
		return deptdesc;
	}

	/**
	 * 设置：父级编号
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	/**
	 * 获取：父级编号
	 */
	public String getParentId() {
		return parentId;
	}

	/**
	 * 设置：顺序
	 */
	public void setOrdernum(Integer ordernum) {
		this.ordernum = ordernum;
	}

	/**
	 * 获取：顺序
	 */
	public Integer getOrdernum() {
		return ordernum;
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
