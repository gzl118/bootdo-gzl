package com.bootdo.system.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.system.dao.RoleMenuDao;
import com.bootdo.system.domain.RoleMenuDO;
import com.bootdo.system.service.RoleMenuService;

@Service
public class RoleMenuServiceImpl implements RoleMenuService {
	@Autowired
	private RoleMenuDao roleMenuDao;

	@Override
	public RoleMenuDO get(String relateId) {
		return roleMenuDao.get(relateId);
	}

	@Override
	public List<RoleMenuDO> list(Map<String, Object> map) {
		return roleMenuDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return roleMenuDao.count(map);
	}

	@Override
	public int save(RoleMenuDO roleMenu) {
		return roleMenuDao.save(roleMenu);
	}

	@Override
	public int update(RoleMenuDO roleMenu) {
		return roleMenuDao.update(roleMenu);
	}

	@Override
	public int remove(String relateId) {
		return roleMenuDao.remove(relateId);
	}

	@Override
	public int batchRemove(String[] relateIds) {
		return roleMenuDao.batchRemove(relateIds);
	}

	@Override
	public int insertlist(List<RoleMenuDO> list) {
		return roleMenuDao.insertlist(list);
	}
	
	@Override
	public List<String> listMenuIdByRoleId(String roleId) {
		return roleMenuDao.listMenuIdByRoleId(roleId);
	}
	@Override
	public int removeByRoleId(String roleId){
		return roleMenuDao.removeByRoleId(roleId);
	}
}
