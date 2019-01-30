package com.bootdo.system.dao;

import com.bootdo.system.domain.UserDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-10-03 09:45:11
 */
@Mapper
public interface UserDao {

	UserDO get(String userId);

	List<UserDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(UserDO User);

	int update(UserDO User);

	int remove(String user_id);

	int batchRemove(String[] userIds);

	UserDO getByName(Map<String, Object> map);
}
