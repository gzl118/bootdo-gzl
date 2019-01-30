package com.bootdo.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.system.dao.StaffDao;
import com.bootdo.system.domain.StaffDO;
import com.bootdo.system.service.StaffService;



@Service
public class StaffServiceImpl implements StaffService {
	@Autowired
	private StaffDao staffDao;
	
	@Override
	public StaffDO get(String employeeId){
		return staffDao.get(employeeId);
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
		return staffDao.update(staff);
	}
	
	@Override
	public int remove(String employeeId){
		return staffDao.remove(employeeId);
	}
	
	@Override
	public int batchRemove(String[] employeeIds){
		return staffDao.batchRemove(employeeIds);
	}
	
}
