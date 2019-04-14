package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */
public class RoleDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//角色ID
	private String roleId;
	//角色名称
	private String rolename;
	//说明
	private String note;
	//编辑人
	private String editUser;
	//编辑时间
	private Date editTime;
	//删除标识，1未删除，2删除
	private Integer deleteflag;
	//备注
	private String ext1;
	//备注
	private String ext2;
	//备注
	private String ext3;

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
	/**
	 * 设置：角色名称
	 */
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	/**
	 * 获取：角色名称
	 */
	public String getRolename() {
		return rolename;
	}
	/**
	 * 设置：说明
	 */
	public void setNote(String note) {
		this.note = note;
	}
	/**
	 * 获取：说明
	 */
	public String getNote() {
		return note;
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
