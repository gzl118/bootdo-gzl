package com.bootdo.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.bootdo.system.dao.StaffDao;
import com.bootdo.system.domain.StaffDO;
import com.bootdo.system.domain.UserRoleDO;
import com.bootdo.system.service.StaffService;



@Service
public class StaffServiceImpl implements StaffService {
	@Autowired
	private StaffDao staffDao;
	
	@Override
	public StaffDO get(Long staffId){
		return staffDao.get(staffId);
	}
	
	@Override
	public List<StaffDO> list(Map<String, Object> map){
		return staffDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return staffDao.count(map);
	}
	
	@Override
	public int save(StaffDO staff){
		return staffDao.save(staff);
	}
	
	@Override
	public int update(StaffDO staff){
		int n=staffDao.update(staff);
		staffDao.updateUserStaff(staff);
		return n;
	}
	
	@Override
	public int remove(Long staffId){
		int n=staffDao.remove(staffId);
		staffDao.deleteUserStaff(staffId);
		return n;
	}
	
	@Override
	public int batchRemove(Long[] staffIds){
		int n=staffDao.batchRemove(staffIds);
		staffDao.deleteUserStaffs(staffIds);
		return n;
	}
}
