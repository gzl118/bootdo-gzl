package com.bootdo.system.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bootdo.common.domain.Tree;
import com.bootdo.common.utils.BuildTree;
import com.bootdo.system.dao.MenuDao;
import com.bootdo.system.dao.RoleMenuDao;
import com.bootdo.system.domain.MenuDO;
import com.bootdo.system.service.MenuService;

@Service
@Transactional(readOnly = false, rollbackFor = Exception.class)
public class MenuServiceImpl implements MenuService {
	@Autowired
	RoleMenuDao roleMenuMapper;

	/**
	 * @param
	 * @return 树形菜单
	 */
	@Cacheable
	@Override
	public Tree<MenuDO> getSysMenuTree(String id) {
		List<Tree<MenuDO>> trees = new ArrayList<Tree<MenuDO>>();
		List<MenuDO> menuDOs = menuDao.listMenuByUserId(id);
		for (MenuDO sysMenuDO : menuDOs) {
			Tree<MenuDO> tree = new Tree<MenuDO>();
			tree.setId(sysMenuDO.getMenuId().toString());
			tree.setParentId(sysMenuDO.getParentId().toString());
			tree.setText(sysMenuDO.getMenuname());
			Map<String, Object> attributes = new HashMap<>(16);
			attributes.put("url", sysMenuDO.getMenuurl());
			attributes.put("icon", sysMenuDO.getMenuicon());
			attributes.put("norder", sysMenuDO.getOrdernum());
			tree.setAttributes(attributes);
			trees.add(tree);
		}
		// 默认顶级菜单为０，根据数据库实际情况调整
		Tree<MenuDO> t = BuildTree.build(trees);
		return t;
	}

	@Override
	public Tree<MenuDO> getTree() {
		List<Tree<MenuDO>> trees = new ArrayList<Tree<MenuDO>>();
		List<MenuDO> menuDOs = menuDao.list(new HashMap<>(16));
		for (MenuDO sysMenuDO : menuDOs) {
			Tree<MenuDO> tree = new Tree<MenuDO>();
			tree.setId(sysMenuDO.getMenuId());
			tree.setParentId(sysMenuDO.getParentId());
			tree.setText(sysMenuDO.getMenuname());
			trees.add(tree);
		}
		// 默认顶级菜单为０，根据数据库实际情况调整
		Tree<MenuDO> t = BuildTree.build(trees);
		return t;
	}

	@Override
	public Tree<MenuDO> getTree(String id) {
		// 根据roleId查询权限
		List<MenuDO> menus = menuDao.list(new HashMap<String, Object>(16));
		List<String> menuIds = roleMenuMapper.listMenuIdByRoleId(id);
		List<String> temp = menuIds;
		for (MenuDO menu : menus) {
			if (temp.contains(menu.getParentId())) {
				menuIds.remove(menu.getParentId());
			}
		}
		List<Tree<MenuDO>> trees = new ArrayList<Tree<MenuDO>>();
		List<MenuDO> menuDOs = menuDao.list(new HashMap<String, Object>(16));
		for (MenuDO sysMenuDO : menuDOs) {
			Tree<MenuDO> tree = new Tree<MenuDO>();
			tree.setId(sysMenuDO.getMenuId().toString());
			tree.setParentId(sysMenuDO.getParentId().toString());
			tree.setText(sysMenuDO.getMenuname());
			Map<String, Object> state = new HashMap<>(16);
			String menuId = sysMenuDO.getMenuId();
			if (menuIds.contains(menuId)) {
				state.put("selected", true);
			} else {
				state.put("selected", false);
			}
			tree.setState(state);
			trees.add(tree);
		}
		// 默认顶级菜单为０，根据数据库实际情况调整
		Tree<MenuDO> t = BuildTree.build(trees);
		return t;
	}

	@Override
	public Set<String> listPerms(String userId) {
		List<String> perms = menuDao.listUserPerms(userId);
		Set<String> permsSet = new HashSet<>();
		for (String perm : perms) {
			if (StringUtils.isNotBlank(perm)) {
				permsSet.addAll(Arrays.asList(perm.trim().split(",")));
			}
		}
		return permsSet;
	}

	@Override
	public List<Tree<MenuDO>> listMenuTree(String id) {
		List<Tree<MenuDO>> trees = new ArrayList<Tree<MenuDO>>();
		List<MenuDO> menuDOs = menuDao.listMenuByUserId(id);
		for (MenuDO sysMenuDO : menuDOs) {
			Tree<MenuDO> tree = new Tree<MenuDO>();
			tree.setId(sysMenuDO.getMenuId());
			tree.setParentId(sysMenuDO.getParentId());
			tree.setText(sysMenuDO.getMenuname());
			Map<String, Object> attributes = new HashMap<>(16);
			attributes.put("url", sysMenuDO.getMenuurl());
			attributes.put("icon", sysMenuDO.getMenuicon());
			attributes.put("norder", sysMenuDO.getOrdernum());
			tree.setAttributes(attributes);
			trees.add(tree);
		}
		// 默认顶级菜单为０，根据数据库实际情况调整
		List<Tree<MenuDO>> list = BuildTree.buildList(trees, "0");
		return list;
	}

	@Autowired
	private MenuDao menuDao;

	@Override
	public List<MenuDO> list(Map<String, Object> map) {
		return menuDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return menuDao.count(map);
	}

	@Transactional(readOnly = false, rollbackFor = Exception.class)
	@Override
	public int save(MenuDO menu) {
		return menuDao.save(menu);
	}

	@Transactional(readOnly = false, rollbackFor = Exception.class)
	@Override
	public int update(MenuDO menu) {
		return menuDao.update(menu);
	}

	@Override
	public int remove(String menuId) {
		return menuDao.remove(menuId);
	}

	@Override
	public int batchRemove(String[] menuIds) {
		return menuDao.batchRemove(menuIds);
	}

	@Override
	public MenuDO get(String menuId) {
		return menuDao.get(menuId);
	}

	@Override
	public int updatelist(List<MenuDO> menuIds) {
		return menuDao.updatelist(menuIds);
	}

	@Override
	public int insertlist(List<MenuDO> menuIds) {
		return menuDao.insertlist(menuIds);
	}
}