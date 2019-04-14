package com.bootdo.system.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bootdo.system.domain.DeptDO;

/**
 * 部门管理
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-10-03 15:35:39
 */
@Mapper
public interface DeptDao {

	DeptDO get(String deptId);

	List<DeptDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(DeptDO Dept);

	int update(DeptDO Dept);

	int remove(String dept_id);

	int batchRemove(String[] deptIds);

	int updatelist(List<DeptDO> Dept);
}
