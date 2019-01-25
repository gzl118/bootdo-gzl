package com.bootdo.system.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.bootdo.common.domain.Tree;
import com.bootdo.system.domain.MenuDO;

@Service
public interface MenuService {
	Tree<MenuDO> getSysMenuTree(String id);

	List<Tree<MenuDO>> listMenuTree(String id);

	Tree<MenuDO> getTree();

	Tree<MenuDO> getTree(String id);

	Set<String> listPerms(String userId);

	MenuDO get(String menuId);

	List<MenuDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(MenuDO menu);

	int update(MenuDO menu);

	int remove(String menuId);

	int batchRemove(String[] menuIds);
}
