package com.bootdo.system.service;

import com.bootdo.system.domain.RoleMenuDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */
public interface RoleMenuService {

	RoleMenuDO get(String relateId);

	List<RoleMenuDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(RoleMenuDO roleMenu);

	int update(RoleMenuDO roleMenu);

	int remove(String relateId);

	int batchRemove(String[] relateIds);

	int insertlist(List<RoleMenuDO> list);

	List<String> listMenuIdByRoleId(String roleId);
	
	int removeByRoleId(String roleId);
}
