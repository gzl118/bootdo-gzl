package com.bootdo.system.service;

import com.bootdo.system.domain.StaffDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2018-10-16 10:36:57
 */
public interface StaffService {
	
	StaffDO get(Long staffId);
	
	List<StaffDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(StaffDO staff);
	
	int update(StaffDO staff);
	
	int remove(Long staffId);
	
	int batchRemove(Long[] staffIds);
}
