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
public class RoleMenuDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//关联ID
	private String relateId;
	//角色ID
	private String roleId;
	//菜单编号
	private String menuId;

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
	 * 设置：菜单编号
	 */
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	/**
	 * 获取：菜单编号
	 */
	public String getMenuId() {
		return menuId;
	}
}
