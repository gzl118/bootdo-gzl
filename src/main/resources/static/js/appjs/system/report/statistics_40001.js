var prefix = "/system/reportStatistics"
$(function() {
	$("#dw-select").chosen({
		maxHeight : 200
	});
	// 点击事件
	$('#dw-select').on('change', function(e, params) {
		console.log(params.selected);
		if (params.selected == -1) {// 选择自定义单位配置
			loaddeptslist();
		} else {
			loaddepts(params.selected);
		}
	});
	$("#autoconfig-select").chosen({
		maxHeight : 200
	});
	// 点击事件
	// $('#autoconfig-select').on('change', function(e, params) {
	//
	// });

	laydateon();
	configLoad();
	selectLoad();
});
function configLoad() {
	var html = "";
	$.ajax({
		url : '/system/reportAutoconfigmain/grouplist',
		data : {
			sort : 'norder',
			order : 'asc',
			limit : 100,
			offset : 0,
			// code: 30001 //不同的统计报表，选择不同的code分类,后台自己控制
			code : $('#dcode').val()
		},
		cache : false,
		success : function(data) {
			$("#autoconfig-select").empty();
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				if (i == 0) {
					html += '<option value="' + data[i].oid + '" selected >'
							+ data[i].tname + '</option>';
				} else {
					html += '<option value="' + data[i].oid + '">'
							+ data[i].tname + '</option>';
				}
			}

			$("#autoconfig-select").append(html);
			$("#autoconfig-select").trigger("chosen:updated");
		}
	});
}
function loaddepts(rdcId) {
	// 加载已配置的单位配置
	$('#exampleTable')
			.bootstrapTreeTable(
					{
						id : 'deptId',
						code : 'deptId',
						parentCode : 'parentId',
						type : "GET", // 请求数据的ajax类型
						url : '/system/reportDept/list/30001', // 请求数据的ajax的url
						ajaxParams : {
							rdcId : rdcId,
							limit : 5000,
							offset : 0
						}, // 请求数据的ajax的data属性
						expandColumn : '1', // 在哪一列上面显示展开按钮
						striped : true, // 是否各行渐变色
						bordered : true, // 是否显示边框
						expandAll : true, // 是否全部展开
						columns : [
								{
									title : '编号',
									field : '',
									visible : false,
									align : 'center',
									valign : 'center',
									width : '50px',
								},
								{
									field : 'sname',
									title : '单位简称',
									valign : 'center',
									witth : 20
								},
								{
									field : 'orderNum',
									title : '排序',
									align : 'center',
									valign : 'center'
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
									valign : 'center',
									formatter : function(item, index) {
										var a = '<a class="btn btn-primary btn-sm " href="#" title="增加下級"  mce_href="#" onclick="add(\''
												+ item.deptId
												+ '\')"><i class="fa fa-plus"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm " href="#" title="删除"  mce_href="#" onclick="removeone(\''
												+ item.rdId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										return a + d;
									}
								} ]
					});
	showSaveBnt(true);
}
function loaddeptslist() {
	// 加载自定义单位配置列表
	$('#exampleTable').bootstrapTreeTable({
		id : 'deptId',
		code : 'deptId',
		parentCode : 'parentId',
		type : "GET", // 请求数据的ajax类型
		url : '/system/sysDept/list', // 请求数据的ajax的url
		ajaxParams : {
			limit : 5000,
			offset : 0
		}, // 请求数据的ajax的data属性
		expandColumn : '1', // 在哪一列上面显示展开按钮
		striped : true, // 是否各行渐变色
		bordered : true, // 是否显示边框
		expandAll : true, // 是否全部展开
		columns : [ {
			field : 'selectItem',
			checkbox : true,
			align : 'center',
			valign : 'center',
			width : '50px',
			hight : '50px'
		}, {
			field : 'name',
			title : '单位名称',
			valign : 'center',
			witth : 20
		}, {
			field : 'delFlag',
			title : '状态',
			align : 'center',
			valign : 'center',
			formatter : function(item, index) {
				if (item.delFlag == '0') {
					return '<span class="label label-danger">禁用</span>';
				} else if (item.delFlag == '1') {
					return '<span class="label label-primary">正常</span>';
				}
			}
		} ]
	});
	showSaveBnt(false);
}
function selectLoad() {
	var html = "";
	$.ajax({
		url : '/system/reportDeptCategory/grouplist',
		data : {
			sort : 'rdc_id',
			order : 'desc',
			limit : 100,
			offset : 0,
			// code: 30001 //不同的统计报表，选择不同的code分类,后台自己控制
			code : $('#dcode').val()
		},
		cache : false,
		success : function(data) {
			// 没有数据，加载自定义的单位列表
			if (data.length < 1) {
				$("#dw-select").empty();
				html += '<option value="-1" selected >添加新配置</option>';
				$("#dw-select").append(html);
				$("#dw-select").trigger("chosen:updated");
				loaddeptslist();
				return;
			}
			$("#dw-select").empty();
			html += '<option value="-1" selected >添加新配置</option>';
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				// console.log(data[i].name);
				if (i == 0) {
					html += '<option value="' + data[i].rdcId + '" selected >'
							+ data[i].name + '</option>';
				} else {
					html += '<option value="' + data[i].rdcId + '">'
							+ data[i].name + '</option>';
				}
			}

			$("#dw-select").append(html);
			$("#dw-select").trigger("chosen:updated");
			loaddepts($('#dw-select').val());
		}
	});
}
function showReport() {
	var configId = $('#autoconfig-select').val();
	if (configId == null || configId == '') {
		layer.msg("请选择自定义配置!");
		return;
	}

	// 获取部门和时间
	var rdepart = new String();
	var rdcId = $('#dw-select').val();
	if (rdcId == -1) {
		// 自定义部门的选择
		rdepart = getSelectedDept();
		if (rdepart == "-1")
			return;
	} else {
		rdepart = getDeptsStrByRdcId(rdcId);
	}
	if (rdepart == "-1" || rdepart == "") {
		layer.msg("请选择要统计单位!");
		return;
	}

	var rdate = $('#renderdate').val();
	if (rdate == "") {
		layer.msg("请选择要统计的年月！");
		return;
		/*
		 * var d=new Date(); d.setDate(1); rdate=formatdate(d);
		 */
	} else
		rdate = $('#renderdate').val() + '-01';

	var curcode = $("#dcode").val();
	// 打开统计报表
	// url = 'http://localhost:7878/jsDemo/reportJsp/showReport.jsp?raq='
	// + curcode + '.raq&rdate=' + rdate + '&rdepart=' + rdepart;
	url = urlrunqian + 'raq=' + curcode + '.raq&rdate=' + rdate + '&rdepart='
			+ rdepart + '&rfoid=' + configId;
	console.log(url);
	var index = layer.open({
		type : 2,
		title : "统计报表",
		shadeClose : false, // 点击遮罩关闭层
		area : [ '1000px', '620px' ],
		fixed : false,
		maxmin : true,
		content : url
	});
	layer.full(index);
}
function formatdate(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
}
function delectDeptCategory() {
	layer.confirm('确定要删除当前的单位配置？删除后无法恢复。', {
		btn : [ '确定', '取消' ]
	}, function() {
		removeDeptCategory($('#dw-select').val());
	});
}
function removeDeptCategory(id) {
	$.ajax({
		url : "/system/reportDeptCategory/remove",
		type : "post",
		data : {
			'rdcId' : id
		},
		success : function(r) {
			if (r.code == 0) {
				layer.msg(r.msg);
				selectLoad();
			} else {
				layer.msg(r.msg);
			}
		}
	});
}
function add(pId) {
	layer.open({
		type : 2,
		title : '添加选择单位',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : '/system/reportDept/add?parentId=' + pId // iframe的url
	});
}
function saveAddedDept(deptId, name, parentId) {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/reportDept/save",
		data : {
			rdcId : $('#dw-select').val(),
			parentId : parentId,
			deptId : deptId,
			sname : name
		},
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
			} else {
				parent.layer.alert(data.msg)
			}
			loaddepts($('#dw-select').val());
		}
	});
}
function batchAddedDepts(deptIds) {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/reportDept/batchAddToDepts",
		data : {
			rdcId : $('#dw-select').val(),
			"ids" : deptIds
		},
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
			} else {
				parent.layer.alert(data.msg)
			}

		}
	});
	loaddepts($('#dw-select').val());
}
function removeone(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : "/system/reportDept/remove",
			type : "post",
			data : {
				'rdId' : id
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					loaddepts($('#dw-select').val());
				} else {
					layer.msg(r.msg);
				}
			}
		});
	});
}
function getSelectedDept()// 返回单位字符串，逗号拼接
{
	var rows = $('#exampleTable').bootstrapTreeTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择单位,您没有选择统计使用的任何单位部门");
		return "-1";
	}
	var ids = new String();
	// 遍历所有选择的行数据，取每条数据对应的ID
	$.each(rows, function(i, row) {
		// console.log(row.id);
		ids += ',' + row.id;
		// console.log(ids);
	});
	// console.log(ids.substr(1));
	return ids.substr(1);
};
function getSelectedDepts()// 返回单位id数组
{
	var rows = $('#exampleTable').bootstrapTreeTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	var ids = new Array();
	// 遍历所有选择的行数据，取每条数据对应的ID
	$.each(rows, function(i, row) {
		// console.log(row.id);
		ids[i] = row.id
	});
	// console.log(ids);
	return ids;
}
function saveCategory() {// 保存成单位配置
	var rows = $('#exampleTable').bootstrapTreeTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择单位,您没有选择统计使用的任何单位");
		return;
	}
	layer.prompt({
		title : '请输入保存配置的名称',
		formType : 0
	}, function(val, index) {
		layer.msg('新的配置命名为：' + val);
		layer.close(index);
		saveDeptToCategory(val);
		selectLoad();
	});

};
function saveDeptToCategory(pname) {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/reportDeptCategory/save/treport",
		data : {
			name : pname,
			code : $('#dcode').val(),
			ids : getSelectedDepts()
		},
		async : false,
		error : function(request) {
			layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				layer.msg("操作成功");

			} else {
				layer.alert(data.msg)
			}

		}
	});
};
function getDeptsStrByRdcId(rdcId) {
	var datas = new String();
	$.ajax({
		cache : true,
		type : "GET",
		url : "/system/reportDept/list/depts",
		async : false,
		data : {
			rdcId : rdcId,
		},
		error : function(request) {
			layer.alert("Connection error");
		},
		success : function(data) {
			if (data.lenght < 1) {
				datas = "-1";
			} else {
				$.each(data, function(i, row) {
					datas += ',' + row;
				});
				datas = datas.substr(1);
			}
		}
	});
	return datas;
};
function laydateon() {
	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format : 'yyyy-MM'
	});
};
function showSaveBnt(isshow) {
	// 控制保存配置按钮的显示隐藏
	// console.log(isshow);
	if (isshow) {
		$("#dept_select").show();
		$("#dept_del").show();
		$("#dept_save").hide();
	} else {
		$("#dept_select").hide();
		$("#dept_del").hide();
		$("#dept_save").show();
	}
};

function saveReport() {
	var configId = $('#autoconfig-select').val();
	if (configId == null || configId == '') {
		layer.msg("请选择自定义配置!");
		return;
	}
	var rdepart = new String();
	var rdcId = $('#dw-select').val();
	if (rdcId == -1) {
		// 自定义部门的选择
		rdepart = getSelectedDept();
		if (rdepart == "-1")
			return;
	} else {
		rdepart = getDeptsStrByRdcId(rdcId);
	}
	if (rdepart == "-1" || rdepart == "") {
		layer.msg("请选择要统计单位");
		return;
	}
	var rdate = $("#renderdate").val();
	if (rdate == null || rdate == "") {
		layer.msg("请选择要统计的年月！");
		return;
	}
	rdate = rdate + "-01";
	var curcode = $("#dcode").val();
	layer.open({
		type : 2,
		title : '保存统计报表',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : '/system/labourreportstaticmain/addautoconfig?ctype=3&rdate='
				+ rdate + '&rdepart=' + rdepart + '&code=' + curcode
				+ '&configid=' + configId// iframe的url
	});
}