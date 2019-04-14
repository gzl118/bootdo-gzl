package com.bootdo.system.service;

import com.bootdo.system.domain.RoleDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */
public interface RoleService {
	
	RoleDO get(String roleId);
	
	List<RoleDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(RoleDO role);
	
	int update(RoleDO role);
	
	int remove(String roleId);
	
	int batchRemove(String[] roleIds);
}
