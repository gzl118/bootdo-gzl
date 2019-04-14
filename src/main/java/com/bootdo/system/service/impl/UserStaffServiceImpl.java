package com.bootdo.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.system.dao.UserStaffDao;
import com.bootdo.system.domain.UserStaffDO;
import com.bootdo.system.service.UserStaffService;

@Service
public class UserStaffServiceImpl implements UserStaffService {
	@Autowired
	private UserStaffDao userStaffDao;

	@Override
	public UserStaffDO get(String relateId) {
		return userStaffDao.get(relateId);
	}

	@Override
	public List<UserStaffDO> list(Map<String, Object> map) {
		return userStaffDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return userStaffDao.count(map);
	}

	@Override
	public int save(UserStaffDO userStaff) {
		return userStaffDao.save(userStaff);
	}

	@Override
	public int update(UserStaffDO userStaff) {
		return userStaffDao.update(userStaff);
	}

	@Override
	public int remove(String relateId) {
		return userStaffDao.remove(relateId);
	}

	@Override
	public int batchRemove(String[] relateIds) {
		return userStaffDao.batchRemove(relateIds);
	}

	@Override
	public UserStaffDO getByUserId(String userId) {
		return userStaffDao.getByUserId(userId);
	}
}
