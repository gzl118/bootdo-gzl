package com.bootdo.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.MenuDO;
import com.bootdo.system.domain.RoleMenuDO;
import com.bootdo.system.service.MenuService;
import com.bootdo.system.service.RoleMenuService;
import com.bootdo.system.vo.MenuVO;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */

@Controller
@RequestMapping("/system/roleMenu")
public class RoleMenuController {
	@Autowired
	private RoleMenuService roleMenuService;
	@Autowired
	MenuService menuService;

	@GetMapping()
	@RequiresPermissions("system:roleMenu:roleMenu")
	String RoleMenu() {
		return "system/roleMenu/roleMenu";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:roleMenu:roleMenu")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<RoleMenuDO> roleMenuList = roleMenuService.list(query);
		int total = roleMenuService.count(query);
		PageUtils pageUtils = new PageUtils(roleMenuList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("system:roleMenu:add")
	String add() {
		return "system/roleMenu/add";
	}

	@GetMapping("/edit/{relateId}")
	@RequiresPermissions("system:roleMenu:edit")
	String edit(@PathVariable("relateId") String relateId, Model model) {
		RoleMenuDO roleMenu = roleMenuService.get(relateId);
		model.addAttribute("roleMenu", roleMenu);
		return "system/roleMenu/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:roleMenu:add")
	public R save(RoleMenuDO roleMenu) {
		if (roleMenuService.save(roleMenu) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("system:roleMenu:edit")
	public R update(RoleMenuDO roleMenu) {
		roleMenuService.update(roleMenu);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("system:roleMenu:remove")
	public R remove(String relateId) {
		if (roleMenuService.remove(relateId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:roleMenu:batchRemove")
	public R remove(@RequestParam("ids[]") String[] relateIds) {
		roleMenuService.batchRemove(relateIds);
		return R.ok();
	}

	@ResponseBody
	@GetMapping("/listmenu")
	public MenuVO listmenu(String roleId) {
		MenuVO mvo = new MenuVO();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleId", roleId);
			List<RoleMenuDO> roleMenuList = roleMenuService.list(map);
			Map<String, Object> query = new HashMap<String, Object>();
			query.put("limit", -1);
			query.put("sort", "ordernum");
			query.put("order", "asc");
			List<MenuDO> menus = menuService.list(query);
			if (menus != null && menus.size() > 0) {
				if (roleMenuList != null && roleMenuList.size() > 0) {
					for (MenuDO item : menus) {
						Optional<RoleMenuDO> itemOP = roleMenuList
								.stream()
								.filter(p -> p.getMenuId().equals(
										item.getMenuId())).findFirst();
						if (itemOP.isPresent()) {
							item.setChecked(true);
						}
					}
				}
			}
			mvo.setMenus(menus);
			mvo.setRoleMenus(roleMenuList);
			mvo.setCode(0);
		} catch (Exception e) {
			e.printStackTrace();
			mvo.setCode(1);
		}
		return mvo;
	}
}
