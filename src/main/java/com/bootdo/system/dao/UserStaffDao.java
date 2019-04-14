package com.bootdo.system.dao;

import com.bootdo.system.domain.UserStaffDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-06 20:59:44
 */
@Mapper
public interface UserStaffDao {

	UserStaffDO get(String relateId);

	List<UserStaffDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(UserStaffDO userStaff);

	int update(UserStaffDO userStaff);

	int remove(String relate_id);

	int batchRemove(String[] relateIds);

	UserStaffDO getByUserId(String userId);
}
