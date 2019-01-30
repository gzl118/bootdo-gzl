package com.bootdo.common.utils;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 查询参数
 */
public class Query extends LinkedHashMap<String, Object> {
	private static final long serialVersionUID = 1L;
	//
	private int offset;
	// 每页条数
	private int limit;

	public Query(Map<String, Object> params) {
		this.putAll(params);
		if (params.containsKey("page") && params.containsKey("limit")) {
			// 分页参数
			Integer page = Integer.parseInt(params.get("page").toString());
			this.limit = Integer.parseInt(params.get("limit").toString());
			Integer offsettemp = (page - 1) * this.limit;
			this.offset = offsettemp;
			this.put("offset", offsettemp);
			this.put("page", page);
			this.put("limit", limit);
		}
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.put("offset", offset);
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
}
