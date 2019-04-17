package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

public class MenuDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 菜单编号
	private String menuId;
	// 菜单名称
	private String menuname;
	// 菜单图标
	private String menuicon;
	// 菜单地址
	private String menuurl;
	// 菜单权限
	private String menuperms;
	// 菜单顺序
	private Integer ordernum;
	// 父菜单ID
	private String parentId;
	// 菜单类型，0目录，1菜单，2按钮
	private Integer menutype;
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
	// 是否选中
	private boolean checked = false;

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

	/**
	 * 设置：菜单名称
	 */
	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}

	/**
	 * 获取：菜单名称
	 */
	public String getMenuname() {
		return menuname;
	}

	/**
	 * 设置：菜单图标
	 */
	public void setMenuicon(String menuicon) {
		this.menuicon = menuicon;
	}

	/**
	 * 获取：菜单图标
	 */
	public String getMenuicon() {
		return menuicon;
	}

	/**
	 * 设置：菜单地址
	 */
	public void setMenuurl(String menuurl) {
		this.menuurl = menuurl;
	}

	/**
	 * 获取：菜单地址
	 */
	public String getMenuurl() {
		return menuurl;
	}

	/**
	 * 设置：菜单权限
	 */
	public void setMenuperms(String menuperms) {
		this.menuperms = menuperms;
	}

	/**
	 * 获取：菜单权限
	 */
	public String getMenuperms() {
		return menuperms;
	}

	/**
	 * 设置：菜单顺序
	 */
	public void setOrdernum(Integer ordernum) {
		this.ordernum = ordernum;
	}

	/**
	 * 获取：菜单顺序
	 */
	public Integer getOrdernum() {
		return ordernum;
	}

	/**
	 * 设置：父菜单ID
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	/**
	 * 获取：父菜单ID
	 */
	public String getParentId() {
		return parentId;
	}

	/**
	 * 设置：菜单类型，0目录，1菜单，2按钮
	 */
	public void setMenutype(Integer menutype) {
		this.menutype = menutype;
	}

	/**
	 * 获取：菜单类型，0目录，1菜单，2按钮
	 */
	public Integer getMenutype() {
		return menutype;
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

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
}