package com.bootdo.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import com.bootdo.common.utils.StringUtils;
import com.bootdo.system.domain.RoleDO;
import com.bootdo.system.domain.RoleMenuDO;
import com.bootdo.system.service.RoleMenuService;
import com.bootdo.system.service.RoleService;
import com.bootdo.system.service.UserRoleService;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */

@Controller
@RequestMapping("/system/role")
public class RoleController {
	@Autowired
	private RoleService roleService;
	@Autowired
	private RoleMenuService roleMenuService;
	@Autowired
	private UserRoleService userRoleService;

	@GetMapping()
	@RequiresPermissions("system:role:role")
	String Role() {
		return "system/role/role";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:role:role")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<RoleDO> roleList = roleService.list(query);
		int total = roleService.count(query);
		PageUtils pageUtils = new PageUtils(roleList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("system:role:add")
	String add() {
		return "system/role/add";
	}

	@GetMapping("/edit/{roleId}")
	@RequiresPermissions("system:role:edit")
	String edit(@PathVariable("roleId") String roleId, Model model) {
		RoleDO role = roleService.get(roleId);
		model.addAttribute("role", role);
		return "system/role/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:role:add")
	public R save(
			@RequestParam(value = "ids[]", required = false) String[] menuIds,
			RoleDO role) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("rolename", role.getRolename());
		params.put("roleId", "");
		RoleDO r = roleService.getByName(params);
		if (r != null)
			return R.error("角色名已存在！");
		if (StringUtils.isBlank(role.getRoleId()))
			role.setRoleId(UUID.randomUUID().toString());
		if (roleService.save(role) > 0) {
			if (menuIds != null && menuIds.length > 0) {
				List<RoleMenuDO> list = new ArrayList<RoleMenuDO>();
				for (int i = 0; i < menuIds.length; i++) {
					RoleMenuDO m = new RoleMenuDO();
					m.setRelateId(UUID.randomUUID().toString());
					m.setRoleId(role.getRoleId());
					m.setMenuId(menuIds[i]);
					list.add(m);
				}
				roleMenuService.insertlist(list);
			}
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("system:role:edit")
	public R update(
			@RequestParam(value = "ids[]", required = false) String[] menuIds,
			RoleDO role) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("rolename", role.getRolename());
		params.put("roleId", role.getRoleId());
		RoleDO r = roleService.getByName(params);
		if (r != null)
			return R.error("角色名已存在！");
		if (roleService.update(role) > 0) {
			if (menuIds != null && menuIds.length > 0) {
				List<RoleMenuDO> list = new ArrayList<RoleMenuDO>();
				for (int i = 0; i < menuIds.length; i++) {
					RoleMenuDO m = new RoleMenuDO();
					m.setRelateId(UUID.randomUUID().toString());
					m.setRoleId(role.getRoleId());
					m.setMenuId(menuIds[i]);
					list.add(m);
				}
				roleMenuService.removeByRoleId(role.getRoleId());
				roleMenuService.insertlist(list);
			}
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("system:role:remove")
	public R remove(String roleId) {
		if (roleService.remove(roleId) > 0) {
			roleMenuService.removeByRoleId(roleId);
			userRoleService.removeByRoleId(roleId);
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:role:batchRemove")
	public R remove(@RequestParam("ids[]") String[] roleIds) {
		if (roleService.batchRemove(roleIds) > 0) {
			roleMenuService.batchRemove(roleIds);
			userRoleService.batchRemove(roleIds);
			return R.ok();
		}
		return R.error();
	}

	@PostMapping("/listMenuIdByRoleId")
	@ResponseBody
	public List<String> listMenuIdByRoleId(String roleId) {
		return roleMenuService.listMenuIdByRoleId(roleId);
	}
}
