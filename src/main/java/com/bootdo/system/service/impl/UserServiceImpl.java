package com.bootdo.system.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bootdo.system.dao.UserDao;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

//@CacheConfig(cacheNames = "user")
@Transactional
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;

	@Override
	public UserDO get(String userId) {
		return userDao.get(userId);
	}

	@Override
	public List<UserDO> list(Map<String, Object> map) {
		return userDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return userDao.count(map);
	}

	@Override
	public int save(UserDO User) {
		return userDao.save(User);
	}

	@Override
	public int update(UserDO User) {
		return userDao.update(User);
	}

	@Override
	public int remove(String userId) {
		return userDao.remove(userId);
	}

	@Override
	public int batchRemove(String[] userIds) {
		return userDao.batchRemove(userIds);
	}

}
