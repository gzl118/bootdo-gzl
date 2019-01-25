package com.bootdo.system.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bootdo.system.dao.UserRoleDao;
import com.bootdo.system.domain.UserRoleDO;
import com.bootdo.system.service.UserRoleService;

@Transactional
@Service
public class UserRoleServiceImpl implements UserRoleService{

    @Autowired
    UserRoleDao userRoleMapper;

	@Override
	public List<UserRoleDO> list(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return userRoleMapper.list(map);
	}

	@Override
	public int removeByUserId(Long userId) {
		// TODO Auto-generated method stub
		return userRoleMapper.removeByUserId(userId);
	}

	@Override
	public int remove(Long id) {
		// TODO Auto-generated method stub
		return userRoleMapper.remove(id);
	}

	@Override
	public int removeByRoleId(Long roleId) {
		// TODO Auto-generated method stub
		return userRoleMapper.removeByRoleId(roleId);
	}

	@Override
	public int save(UserRoleDO userRole) {
		// TODO Auto-generated method stub
		return userRoleMapper.save(userRole);
	}

	@Override
	public int batchSave(List<UserRoleDO> list) {
		// TODO Auto-generated method stub
		return userRoleMapper.batchSave(list);
	}
    
    
}
