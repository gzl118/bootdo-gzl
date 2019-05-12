package com.bootdo.system.service;

import com.bootdo.system.domain.UserDO;
import com.bootdo.system.domain.UserRoleDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-18 22:28:52
 */
public interface UserRoleService {

	UserRoleDO get(String relateId);

	List<UserRoleDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(UserRoleDO userRole);

	int update(UserRoleDO userRole);

	int remove(String relateId);

	int batchRemove(String[] relateIds);

	List<UserDO> listUnInRole(Map<String, Object> map);
	
	int insertlist(List<UserRoleDO> list);
}
