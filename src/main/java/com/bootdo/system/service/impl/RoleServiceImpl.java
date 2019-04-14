package com.bootdo.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.system.dao.RoleDao;
import com.bootdo.system.domain.RoleDO;
import com.bootdo.system.service.RoleService;



@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleDao roleDao;
	
	@Override
	public RoleDO get(String roleId){
		return roleDao.get(roleId);
	}
	
	@Override
	public List<RoleDO> list(Map<String, Object> map){
		return roleDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return roleDao.count(map);
	}
	
	@Override
	public int save(RoleDO role){
		return roleDao.save(role);
	}
	
	@Override
	public int update(RoleDO role){
		return roleDao.update(role);
	}
	
	@Override
	public int remove(String roleId){
		return roleDao.remove(roleId);
	}
	
	@Override
	public int batchRemove(String[] roleIds){
		return roleDao.batchRemove(roleIds);
	}
	
}
