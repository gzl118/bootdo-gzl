package com.bootdo.system.service;

import com.bootdo.system.domain.UserStaffDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-06 20:59:44
 */
public interface UserStaffService {
	
	UserStaffDO get(String relateId);
	
	List<UserStaffDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(UserStaffDO userStaff);
	
	int update(UserStaffDO userStaff);
	
	int remove(String relateId);
	
	int batchRemove(String[] relateIds);
	
	UserStaffDO getByUserId(String userId);
}
