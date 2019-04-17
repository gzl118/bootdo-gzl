package com.bootdo.system.vo;

import java.util.List;

import com.bootdo.system.domain.MenuDO;
import com.bootdo.system.domain.RoleMenuDO;

public class MenuVO {
	private List<RoleMenuDO> roleMenus;
	private List<MenuDO> menus;
	private int code;

	public List<RoleMenuDO> getRoleMenus() {
		return roleMenus;
	}

	public void setRoleMenus(List<RoleMenuDO> roleMenus) {
		this.roleMenus = roleMenus;
	}

	public List<MenuDO> getMenus() {
		return menus;
	}

	public void setMenus(List<MenuDO> menus) {
		this.menus = menus;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
}
