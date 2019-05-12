package com.bootdo.system.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bootdo.system.domain.UserDO;
import com.bootdo.system.domain.UserRoleDO;

/**
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-18 22:28:52
 */
@Mapper
public interface UserRoleDao {

	UserRoleDO get(String relateId);
	
	List<UserRoleDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(UserRoleDO userRole);
	
	int update(UserRoleDO userRole);
	
	int remove(String relate_id);
	
	int batchRemove(String[] relateIds);
	
	List<UserDO> listUnInRole(Map<String,Object> map);
	
	int insertlist(List<UserRoleDO> list);
}
