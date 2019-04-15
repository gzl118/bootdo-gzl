package com.bootdo.system.dao;

import com.bootdo.system.domain.RoleMenuDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-04-14 18:52:03
 */
@Mapper
public interface RoleMenuDao {

	RoleMenuDO get(String relateId);

	List<RoleMenuDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(RoleMenuDO roleMenu);

	int update(RoleMenuDO roleMenu);

	int remove(String relate_id);

	int batchRemove(String[] relateIds);

	List<String> listMenuIdByRoleId(String roleId);

	int insertlist(List<RoleMenuDO> list);

	int removeByRoleId(String roleId);
}
