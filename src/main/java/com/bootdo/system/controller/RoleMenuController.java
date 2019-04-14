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

import com.bootdo.system.domain.RoleMenuDO;
import com.bootdo.system.service.RoleMenuService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

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
	
	@GetMapping()
	@RequiresPermissions("system:roleMenu:roleMenu")
	String RoleMenu(){
	    return "system/roleMenu/roleMenu";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:roleMenu:roleMenu")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<RoleMenuDO> roleMenuList = roleMenuService.list(query);
		int total = roleMenuService.count(query);
		PageUtils pageUtils = new PageUtils(roleMenuList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("system:roleMenu:add")
	String add(){
	    return "system/roleMenu/add";
	}

	@GetMapping("/edit/{relateId}")
	@RequiresPermissions("system:roleMenu:edit")
	String edit(@PathVariable("relateId") String relateId,Model model){
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
	public R save( RoleMenuDO roleMenu){
		if(roleMenuService.save(roleMenu)>0){
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
	public R update( RoleMenuDO roleMenu){
		roleMenuService.update(roleMenu);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("system:roleMenu:remove")
	public R remove( String relateId){
		if(roleMenuService.remove(relateId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:roleMenu:batchRemove")
	public R remove(@RequestParam("ids[]") String[] relateIds){
		roleMenuService.batchRemove(relateIds);
		return R.ok();
	}
	
}
