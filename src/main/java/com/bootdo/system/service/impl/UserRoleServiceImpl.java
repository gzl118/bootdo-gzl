package com.bootdo.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.system.dao.UserRoleDao;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.domain.UserRoleDO;
import com.bootdo.system.service.UserRoleService;

@Service
public class UserRoleServiceImpl implements UserRoleService {
	@Autowired
	private UserRoleDao userRoleDao;

	@Override
	public UserRoleDO get(String relateId) {
		return userRoleDao.get(relateId);
	}

	@Override
	public List<UserRoleDO> list(Map<String, Object> map) {
		return userRoleDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return userRoleDao.count(map);
	}

	@Override
	public int save(UserRoleDO userRole) {
		return userRoleDao.save(userRole);
	}

	@Override
	public int update(UserRoleDO userRole) {
		return userRoleDao.update(userRole);
	}

	@Override
	public int remove(String relateId) {
		return userRoleDao.remove(relateId);
	}

	@Override
	public int batchRemove(String[] relateIds) {
		return userRoleDao.batchRemove(relateIds);
	}

	@Override
	public List<UserDO> listUnInRole(Map<String, Object> map) {
		return userRoleDao.listUnInRole(map);
	}

	@Override
	public int insertlist(List<UserRoleDO> list) {
		return userRoleDao.insertlist(list);
	}
}
