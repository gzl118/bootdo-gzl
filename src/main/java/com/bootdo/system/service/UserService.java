package com.bootdo.system.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bootdo.system.domain.UserDO;

@Service
public interface UserService {
	UserDO get(String userId);

	List<UserDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(UserDO User);

	int update(UserDO User);

	int remove(String userId);

	int batchRemove(String[] userIds);

	UserDO getByName(Map<String, Object> map);
}
