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
import com.bootdo.system.domain.DeptDO;
import com.bootdo.system.service.DeptService;

/**
 * 部门管理
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-09-27 14:40:36
 */

@Controller
@RequestMapping("/system/dept")
public class DeptController extends BaseController {
	@Autowired
	private DeptService deptService;

	@GetMapping()
	@RequiresPermissions("system:dept:dept")
	String Dept() {
		return "system/dept/dept";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("system:dept:dept")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<DeptDO> deptList = deptService.list(query);
		int total = deptService.count(query);
		PageUtils pageUtils = new PageUtils(deptList, total, 0);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("system:dept:add")
	String add() {
		return "system/dept/add";
	}

	@GetMapping("/edit/{deptId}")
	@RequiresPermissions("system:dept:edit")
	String edit(@PathVariable("deptId") String deptId, Model model) {
		DeptDO dept = deptService.get(deptId);
		model.addAttribute("dept", dept);
		return "system/dept/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("system:dept:add")
	public R save(DeptDO dept) {
		if (deptService.save(dept) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("system:dept:edit")
	public R update(DeptDO dept) {
		deptService.update(dept);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("system:dept:remove")
	public R remove(String deptId) {
		if (deptService.remove(deptId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:dept:batchRemove")
	public R remove(@RequestParam("ids[]") String[] deptIds) {
		deptService.batchRemove(deptIds);
		return R.ok();
	}

}
