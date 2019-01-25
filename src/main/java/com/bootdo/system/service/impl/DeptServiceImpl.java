package com.bootdo.system.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.system.dao.DeptDao;
import com.bootdo.system.domain.DeptDO;
import com.bootdo.system.service.DeptService;

@Service
public class DeptServiceImpl implements DeptService {
	@Autowired
	private DeptDao DeptDao;

	@Override
	public DeptDO get(String deptId) {
		return DeptDao.get(deptId);
	}

	@Override
	public List<DeptDO> list(Map<String, Object> map) {
		return DeptDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return DeptDao.count(map);
	}

	@Override
	public int save(DeptDO Dept) {
		return DeptDao.save(Dept);
	}

	@Override
	public int update(DeptDO Dept) {
		return DeptDao.update(Dept);
	}

	@Override
	public int remove(String deptId) {
		return DeptDao.remove(deptId);
	}

	@Override
	public int batchRemove(String[] deptIds) {
		return DeptDao.batchRemove(deptIds);
	}

}
