package com.bootdo.system.service;

import com.bootdo.system.domain.StaffDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-01-30 14:52:19
 */
public interface StaffService {
	
	StaffDO get(String employeeId);
	
	List<StaffDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(StaffDO staff);
	
	int update(StaffDO staff);
	
	int remove(String employeeId);
	
	int batchRemove(String[] employeeIds);
}
