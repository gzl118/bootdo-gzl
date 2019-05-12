package com.bootdo.system.controller;

import java.util.ArrayList;
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
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.domain.UserRoleDO;
import com.bootdo.system.service.UserRoleService;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-18 22:28:52
 */

@Controller
@RequestMapping("/system/userRole")
public class UserRoleController {
	@Autowired
	private UserRoleService userRoleService;

	@GetMapping()
	// @RequiresPermissions("system:userRole:userRole")
	String UserRole(String roleId, Model model) {
		model.addAttribute("roleId", roleId);
		return "system/role/userlist";
	}

	@GetMapping("addUser")
	// @RequiresPermissions("system:userRole:userRole")
	String addUser(String roleId, Model model) {
		model.addAttribute("roleId", roleId);
		return "system/role/addUsers";
	}

	@ResponseBody
	@GetMapping("/list")
	// @RequiresPermissions("system:userRole:userRole")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<UserRoleDO> userRoleList = userRoleService.list(query);
		int total = userRoleService.count(query);
		PageUtils pageUtils = new PageUtils(userRoleList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("system:userRole:add")
	String add() {
		return "system/userRole/add";
	}

	@GetMapping("/edit/{relateId}")
	@RequiresPermissions("system:userRole:edit")
	String edit(@PathVariable("relateId") String relateId, Model model) {
		UserRoleDO userRole = userRoleService.get(relateId);
		model.addAttribute("userRole", userRole);
		return "system/userRole/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:userRole:add")
	public R save(UserRoleDO userRole) {
		if (userRoleService.save(userRole) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("system:userRole:edit")
	public R update(UserRoleDO userRole) {
		userRoleService.update(userRole);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("system:userRole:remove")
	public R remove(String relateId) {
		if (userRoleService.remove(relateId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	// @RequiresPermissions("system:userRole:batchRemove")
	public R remove(@RequestParam("ids[]") String[] relateIds) {
		userRoleService.batchRemove(relateIds);
		return R.ok();
	}

	@ResponseBody
	@GetMapping("/listUnInRole")
	// @RequiresPermissions("system:userRole:userRole")
	public PageUtils listUnInRole(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<UserDO> userRoleList = userRoleService.listUnInRole(query);
		query.put("limit", -1);
		List<UserDO> userRoleList1 = userRoleService.listUnInRole(query);
		PageUtils pageUtils = new PageUtils(userRoleList, userRoleList1.size());
		return pageUtils;
	}

	@ResponseBody
	@PostMapping("/insertlist")
	// @RequiresPermissions("sys:userRole:insertlist")
	public R insertlist(@RequestParam("ids[]") String[] userIds, String roleId) {
		if (userIds != null && userIds.length > 0) {
			List<UserRoleDO> list = new ArrayList<UserRoleDO>();
			for (int i = 0; i < userIds.length; i++) {
				UserRoleDO m = new UserRoleDO();
				m.setRelateId(UUID.randomUUID().toString());
				m.setRoleId(roleId);
				m.setUserId(userIds[i]);
				list.add(m);
			}
			if (userRoleService.insertlist(list) > 0)
				return R.ok();
		}
		return R.error();
	}
}
