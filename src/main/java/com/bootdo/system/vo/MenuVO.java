package com.bootdo.system.vo;

import java.util.List;

import com.bootdo.system.domain.MenuDO;

public class MenuVO {
	private List<MenuDO> menus;
	private int code;

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
