package com.bootdo.system.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.system.domain.UserStaffDO;
import com.bootdo.system.service.UserStaffService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-06 20:59:44
 */
 
@Controller
@RequestMapping("/system/userStaff")
public class UserStaffController {
	@Autowired
	private UserStaffService userStaffService;
	
	@GetMapping()
	@RequiresPermissions("system:userStaff:userStaff")
	String UserStaff(){
	    return "system/userStaff/userStaff";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:userStaff:userStaff")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<UserStaffDO> userStaffList = userStaffService.list(query);
		int total = userStaffService.count(query);
		PageUtils pageUtils = new PageUtils(userStaffList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("system:userStaff:add")
	String add(){
	    return "system/userStaff/add";
	}

	@GetMapping("/edit/{relateId}")
	@RequiresPermissions("system:userStaff:edit")
	String edit(@PathVariable("relateId") String relateId,Model model){
		UserStaffDO userStaff = userStaffService.get(relateId);
		model.addAttribute("userStaff", userStaff);
	    return "system/userStaff/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:userStaff:add")
	public R save( UserStaffDO userStaff){
		if(userStaffService.save(userStaff)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("system:userStaff:edit")
	public R update( UserStaffDO userStaff){
		userStaffService.update(userStaff);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("system:userStaff:remove")
	public R remove( String relateId){
		if(userStaffService.remove(relateId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:userStaff:batchRemove")
	public R remove(@RequestParam("ids[]") String[] relateIds){
		userStaffService.batchRemove(relateIds);
		return R.ok();
	}
	
}
