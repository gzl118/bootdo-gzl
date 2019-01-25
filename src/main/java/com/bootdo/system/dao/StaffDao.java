package com.bootdo.system.dao;

import com.bootdo.system.domain.StaffDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author wwpan
 * @email 1992lcg@163.com
 * @date 2018-10-16 10:36:57
 */
@Mapper
public interface StaffDao {

	StaffDO get(Long staffId);
	
	List<StaffDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(StaffDO staff);
	
	int update(StaffDO staff);
	
	int remove(Long staff_id);
	
	int batchRemove(Long[] staffIds);
	
	int updateUserStaff(StaffDO staff);
	
	int deleteUserStaff(Long staff_id);
	
	int deleteUserStaffs(Long[] staffIds);
}
