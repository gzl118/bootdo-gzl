package com.bootdo.system.controller;

import java.util.ArrayList;
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

import com.bootdo.common.annotation.Log;
import com.bootdo.common.config.Constant;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.RoleDO;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.domain.UserRoleDO;
import com.bootdo.system.service.RoleService;
import com.bootdo.system.service.UserRoleService;

@RequestMapping("/sys/roleuser")
@Controller
public class UserRoleController extends BaseController{
	String prefix = "system/role";
	@Autowired
	UserRoleService userroleservice;

	
//	@RequiresPermissions("sys:role:userlist")
	@GetMapping()
	String role() {
		return prefix + "/userlist";
	}

//	@RequiresPermissions("sys:role:userlist")
	@GetMapping("/list")
	@ResponseBody()
	PageUtils list(@RequestParam Map<String, Object> params) {
		 Query query = new Query(params);
		List<UserRoleDO> roleusers = userroleservice.list(query);
		int total =0;
		if(roleusers!=null) total=roleusers.size();
		PageUtils pageUtils = new PageUtils(roleusers, total);
		return pageUtils;
	}
	
//	@RequiresPermissions("sys:role:userlist")
	@GetMapping("/members/{id}")
	String edit(Model model, @PathVariable("id") Long id) {
		model.addAttribute("roleId", id);
		return prefix+"/userlist";
	}
	
	@Log("删除角色成员")
//	@RequiresPermissions("sys:role:remove")
	@PostMapping("/remove")
	@ResponseBody()
	R save(Long id) {
		if (userroleservice.remove(id) > 0) {
			return R.ok();
		} else {
			return R.error(1, "删除失败");
		}
	}
	
//	@RequiresPermissions("sys:user:add")
	@Log("添加角色成员")
	@GetMapping("/add/{id}")
	String add(Model model,@PathVariable("id") String id) {
		model.addAttribute("roleId", id);
		return prefix + "/addUsers";
	}
	
	@ResponseBody()
	@PostMapping("/addToRole")
	R addtorole(Long id,Long roleId) {
		UserRoleDO userRole = new UserRoleDO();
		userRole.setRoleId(roleId);
		userRole.setUserId(id);
		if (userroleservice.save(userRole) > 0) {
			return R.ok();
		}
		return R.error();
	}
	
	@ResponseBody()
	@PostMapping("/batchAddToRole")
	R batchAddToRole(@RequestParam("ids[]") Long[] userIds,Long roleId) {
		List<UserRoleDO> list = new ArrayList<UserRoleDO>();
		for(int i=0;i<userIds.length;i++) {
			UserRoleDO userRole = new UserRoleDO();
			userRole.setRoleId(roleId);
			userRole.setUserId(userIds[i]);
			list.add(userRole);
		}
		int r = userroleservice.batchSave(list);
		if (r > 0) {
			return R.ok();
		}
		return R.error();
	}
	
}
