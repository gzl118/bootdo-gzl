package com.bootdo.system.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bootdo.system.domain.UserRoleDO;

@Service
public interface UserRoleService {
	
//	UserRoleDO get(Long id);

	List<UserRoleDO> list(Map<String, Object> map);

//	int count(Map<String, Object> map);
//
	int save(UserRoleDO userRole);
//
//	int update(UserRoleDO userRole);
//
	int remove(Long id);
//
//	int batchRemove(Long[] ids);
//
//	List<Long> listRoleId(Long userId);

	int removeByUserId(Long userId);

	int removeByRoleId(Long roleId);
//
	int batchSave(List<UserRoleDO> list);
//
//	int batchRemoveByUserId(Long[] ids);
	
}
