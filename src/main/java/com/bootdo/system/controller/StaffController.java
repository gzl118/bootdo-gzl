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

import com.bootdo.system.domain.StaffDO;
import com.bootdo.system.service.StaffService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * @author wwpan
 * @email 1992lcg@163.com
 * @date 2018-10-16 10:36:57
 */
 
@Controller
@RequestMapping("/system/staff")
public class StaffController {
	@Autowired
	private StaffService staffService;
	
	@GetMapping()
	@RequiresPermissions("system:staff:staff")
	String Staff(){
	    return "system/staff/staff";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:staff:staff")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<StaffDO> staffList = staffService.list(query);
//		int total = staffService.count(query);
		int total =0;
		if(staffList!=null) total=staffList.size();
		PageUtils pageUtils = new PageUtils(staffList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("system:staff:add")
	String add(){
	    return "system/staff/add";
	}

	@GetMapping("/edit/{staffId}")
	@RequiresPermissions("system:staff:edit")
	String edit(@PathVariable("staffId") Long staffId,Model model){
		StaffDO staff = staffService.get(staffId);
		model.addAttribute("staff", staff);
	    return "system/staff/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:staff:add")
	public R save( StaffDO staff){
		if(staffService.save(staff)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("system:staff:edit")
	public R update( StaffDO staff){
		staffService.update(staff);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("system:staff:remove")
	public R remove( Long staffId){
		if(staffService.remove(staffId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:staff:batchRemove")
	public R remove(@RequestParam("ids[]") Long[] staffIds){
		staffService.batchRemove(staffIds);
		return R.ok();
	}
	
	@GetMapping("/selectView")
	String selectView(){
	    return "system/staff/select";
	}
	
}
