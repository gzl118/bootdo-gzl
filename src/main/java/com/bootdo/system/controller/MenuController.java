package com.bootdo.system.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.common.annotation.Log;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.Tree;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.StringUtils;
import com.bootdo.system.domain.MenuDO;
import com.bootdo.system.service.MenuService;

/**
 * @author bootdo 1992lcg@163.com
 */
@RequestMapping("/system/menu")
@Controller
public class MenuController extends BaseController {
	String prefix = "system/menu";
	@Autowired
	MenuService menuService;

	@RequiresPermissions("system:menu:menu")
	@GetMapping()
	String menu(Model model) {
		return prefix + "/menu";
	}

	@RequiresPermissions("system:menu:menu")
	@RequestMapping("/list")
	@ResponseBody
	public PageUtils list(@RequestParam Map<String, Object> params) {
		Query query = new Query(params);
		List<MenuDO> menus = menuService.list(query);
		int total = menuService.count(query);
		PageUtils pageUtils = new PageUtils(menus, total);
		return pageUtils;
	}

	@Log("添加菜单")
	@RequiresPermissions("system:menu:add")
	@GetMapping("/add/{pId}")
	String add(Model model, @PathVariable("pId") String pId) {
		model.addAttribute("pId", pId);
		if (pId.equals("0")) {
			model.addAttribute("pName", "根目录");
		} else {
			model.addAttribute("pName", menuService.get(pId).getMenuname());
		}
		return prefix + "/add";
	}

	@Log("编辑菜单")
	@RequiresPermissions("system:menu:edit")
	@GetMapping("/edit/{id}")
	String edit(Model model, @PathVariable("id") String id) {
		MenuDO mdo = menuService.get(id);
		String pId = mdo.getParentId();
		if (pId.equals("0")) {
			model.addAttribute("pName", "根目录");
		} else {
			model.addAttribute("pName", menuService.get(pId).getMenuname());
		}
		model.addAttribute("menu", mdo);
		return prefix + "/edit";
	}

	@Log("保存菜单")
	@RequiresPermissions("system:menu:add")
	@PostMapping("/save")
	@ResponseBody
	R save(MenuDO menu) {
		if (StringUtils.isBlank(menu.getMenuId()))
			menu.setMenuId(UUID.randomUUID().toString());
		if (menuService.save(menu) > 0) {
			return R.ok();
		} else {
			return R.error(1, "保存失败");
		}
	}

	@Log("更新菜单")
	@RequiresPermissions("system:menu:edit")
	@PostMapping("/update")
	@ResponseBody
	R update(MenuDO menu) {
		if (menuService.update(menu) > 0) {
			return R.ok();
		} else {
			return R.error(1, "更新失败");
		}
	}

	@Log("删除菜单")
	@RequiresPermissions("system:menu:remove")
	@PostMapping("/remove")
	@ResponseBody
	R remove(String id) {
		if (menuService.remove(id) > 0) {
			return R.ok();
		} else {
			return R.error(1, "删除失败");
		}
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("system:menu:batchRemove")
	public R remove(@RequestParam("ids[]") String[] menuIds) {
		menuService.batchRemove(menuIds);
		return R.ok();
	}

	@GetMapping("/tree")
	@ResponseBody
	Tree<MenuDO> tree() {
		Tree<MenuDO> tree = menuService.getTree();
		return tree;
	}

	@GetMapping("/tree/{roleId}")
	@ResponseBody
	Tree<MenuDO> tree(@PathVariable("roleId") String roleId) {
		Tree<MenuDO> tree = menuService.getTree(roleId);
		return tree;
	}

	@GetMapping("/menuTreeDrap")
	String menuTreeDrap() {
		return "system/menu/menuTreeDrap";
	}

	@PostMapping("/changeOrder")
	@ResponseBody
	@RequiresPermissions("system:menu:changeOrder")
	public R changeOrder(@RequestBody List<MenuDO> menuIds) {
		if (menuService.updatelist(menuIds) > 0) {
			return R.ok();
		}
		return R.error();
	}

	@GetMapping("/menuBtn/{id}")
	@RequiresPermissions("system:menu:savebtn")
	String menuBtn(Model model, @PathVariable("id") String id) {
		model.addAttribute("pId", id);
		return "system/menu/menuBtn";
	}

	@PostMapping("/savebtn")
	@ResponseBody
	@RequiresPermissions("system:menu:savebtn")
	public R savebtn(@RequestBody List<MenuDO> menuIds) {
		menuIds.stream().forEach(p -> {
			p.setMenuId(UUID.randomUUID().toString());
		});
		if (menuService.insertlist(menuIds) > 0) {
			return R.ok();
		}
		return R.error();
	}

	@GetMapping("icon")
	String icon() {
		return prefix + "/iconSelect";
	}
}