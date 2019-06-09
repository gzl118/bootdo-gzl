package com.bootdo.system.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bootdo.system.domain.RoleDO;

/**
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */
@Mapper
public interface RoleDao {

	RoleDO get(String roleId);

	List<RoleDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(RoleDO role);

	int update(RoleDO role);

	int remove(String role_id);

	int batchRemove(String[] roleIds);

	RoleDO getByName(Map<String, Object> map);
}
