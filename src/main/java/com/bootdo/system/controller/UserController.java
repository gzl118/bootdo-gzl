package com.bootdo.system.controller;

import java.util.List;
import java.util.Map;
import java.util.Objects;
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

import com.bootdo.common.annotation.Log;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.MD5Utils;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.StringUtils;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.domain.UserStaffDO;
import com.bootdo.system.service.UserService;
import com.bootdo.system.service.UserStaffService;
import com.bootdo.system.vo.UserVO;

@RequestMapping("/system/user")
@Controller
public class UserController extends BaseController {
	@Autowired
	private UserService userService;
	@Autowired
	private UserStaffService userStaffService;

	@GetMapping()
	@RequiresPermissions("system:user:user")
	String User() {
		return "system/user/user";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:user:user")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<UserDO> userList = userService.list(query);
		int total = userService.count(query);
		PageUtils pageUtils = new PageUtils(userList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("system:user:add")
	String add() {
		return "system/user/add";
	}

	@GetMapping("/edit/{userId}")
	@RequiresPermissions("system:user:edit")
	String edit(@PathVariable("userId") String userId, Model model) {
		UserDO user = userService.get(userId);
		model.addAttribute("user", user);
		UserStaffDO userStaff = userStaffService.getByUserId(userId);
		if (userStaff != null) {
			model.addAttribute("employeeId", userStaff.getEmployeeId());
			model.addAttribute("employeename", userStaff.getEmployeename());
		}
		return "system/user/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:user:add")
	public R save(UserDO user) {
		if (StringUtils.isBlank(user.getUserId()))
			user.setUserId(UUID.randomUUID().toString());
		user.setUserpwd(MD5Utils.encrypt(user.getUsername(), user.getUserpwd()));
		if (userService.save(user) > 0) {
			if (!StringUtils.isEmpty(user.getEmployeeId())) {
				UserStaffDO userStaff = new UserStaffDO();
				userStaff.setRelateId(UUID.randomUUID().toString());
				userStaff.setEmployeeId(user.getEmployeeId());
				userStaff.setUserId(user.getUserId());
				userStaffService.save(userStaff);
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
	@RequiresPermissions("system:user:edit")
	public R update(UserDO user) {
		userService.update(user);
		if (!StringUtils.isEmpty(user.getEmployeeId())) {
			UserStaffDO userStaff = userStaffService.getByUserId(user
					.getUserId());
			if (userStaff == null) {
				userStaff = new UserStaffDO();
				userStaff.setRelateId(UUID.randomUUID().toString());
				userStaff.setEmployeeId(user.getEmployeeId());
				userStaff.setUserId(user.getUserId());
				userStaffService.save(userStaff);
			} else {
				userStaff.setEmployeeId(user.getEmployeeId());
				userStaff.setUserId(user.getUserId());
				userStaffService.update(userStaff);
			}
		}
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("system:user:remove")
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
	@RequiresPermissions("system:user:batchRemove")
	public R remove(@RequestParam("ids[]") String[] userIds) {
		userService.batchRemove(userIds);
		return R.ok();
	}

	@PostMapping("/isExist")
	@ResponseBody
	public R isExist(@RequestParam Map<String, Object> params) {
		UserDO u = userService.getByName(params);
		if (u == null)
			return R.ok();
		return R.error("用户名已存在！");
	}

	@PostMapping("/adminresetpwd")
	@ResponseBody
	@RequiresPermissions("system:user:adminresetpwd")
	public R adminresetpwd(String userId) {
		UserDO user = userService.get(userId);
		user.setUserpwd(MD5Utils.encrypt(user.getUsername(), "111111"));
		if (userService.update(user) > 0) {
			return R.ok();
		}
		return R.error();
	}

	@Log("提交更改用户密码")
	@PostMapping("/resetPwd")
	@ResponseBody
	R resetPwd(UserVO userVO) {
		try {
			this.resetPwdfunc(userVO, getUser());
			return R.ok();
		} catch (Exception e) {
			return R.error(1, e.getMessage());
		}

	}

	private int resetPwdfunc(UserVO userVO, UserDO userDO) throws Exception {
		if (Objects.equals(userVO.getUserDO().getUserId(), userDO.getUserId())) {
			if (Objects.equals(
					MD5Utils.encrypt(userDO.getUsername(), userVO.getPwdOld()),
					userDO.getUserpwd())) {
				userDO.setUserpwd(MD5Utils.encrypt(userDO.getUsername(),
						userVO.getPwdNew()));
				return userService.update(userDO);
			} else {
				throw new Exception("输入的旧密码有误！");
			}
		} else {
			throw new Exception("你修改的不是你登录的账号！");
		}
	}

	@GetMapping("/personal")
	String personal(Model model) {
		UserDO userDO = userService.get(getUserId());
		model.addAttribute("user", userDO);
		return "system/user/personal";
	}
}
