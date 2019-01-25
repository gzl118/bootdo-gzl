package com.bootdo.system.controller;

import java.util.List;
import java.util.Map;

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

import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

@RequestMapping("/sys/user")
@Controller
public class UserController extends BaseController {
	@Autowired
	private UserService userService;

	@GetMapping()
	@RequiresPermissions("sys:user:user")
	String User() {
		return "system/user/user";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sys:user:user")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<UserDO> userList = userService.list(query);
		int total = userService.count(query);
		PageUtils pageUtils = new PageUtils(userList, total, 0);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("sys:user:add")
	String add() {
		return "system/user/add";
	}

	@GetMapping("/edit/{userId}")
	@RequiresPermissions("sys:user:edit")
	String edit(@PathVariable("userId") String userId, Model model) {
		UserDO user = userService.get(userId);
		model.addAttribute("user", user);
		return "system/user/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sys:user:add")
	public R save(UserDO user) {
		if (userService.save(user) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sys:user:edit")
	public R update(UserDO user) {
		userService.update(user);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("sys:user:remove")
	public R remove(String userId) {
		if (userService.remove(userId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("sys:user:batchRemove")
	public R remove(@RequestParam("ids[]") String[] userIds) {
		userService.batchRemove(userIds);
		return R.ok();
	}
}
