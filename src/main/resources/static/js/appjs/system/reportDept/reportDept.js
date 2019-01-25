
var prefix = "/system/reportDept"
$(function() {
//	var rdcId = '';
//	rdcId=$("#rdcId").val();
	load();
});

function load() {
	$('#exampleTable')
		.bootstrapTreeTable(
			{
				id : 'deptId',
				code : 'deptId',
                parentCode : 'parentId',
                params:'85',
				type : "GET", // 请求数据的ajax类型
				url : prefix + '/list', // 请求数据的ajax的url
				ajaxParams : {
//					rdcId: rdcId,
					rdcId : $('#rdcId').val(),
					limit : 5000,
					offset : 0,
					name : $('#searchName').val()
							}, // 请求数据的ajax的data属性
				expandColumn : '1', // 在哪一列上面显示展开按钮
				striped : true, // 是否各行渐变色
				bordered : true, // 是否显示边框
				expandAll : false, // 是否全部展开								
				columns : [
					{
						title : '编号',
						field : '',
						visible : false,
						align : 'center',
						valign : 'center',
						width : '50px',
					},
//					{
//						field : 'deptId',
//						title : 'deptId',
//						align : 'center',
//                        valign : 'center',
//						witth :20
//					},
					{
						field : 'sname',
						title : '单位简称',
                        valign : 'center',
						witth :20
					},
					{
						field : 'orderNum',
						title : '排序',
                        align : 'center',
                        valign : 'center'
					},
//					{
//						field : 'rdcId', 
//						title : '归属分类' 
//					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
                        valign : 'center',
						formatter : function(item, index) {
							var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ item.rdId
								+ '\')"><i class="fa fa-edit"></i></a> ';
							var a = '<a class="btn btn-primary btn-sm ' + s_add_h + '" href="#" title="增加下級"  mce_href="#" onclick="add(\''
								+ item.deptId
								+ '\')"><i class="fa fa-plus"></i></a> ';
							var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="removeone(\''
								+ item.rdId
								+ '\')"><i class="fa fa-remove"></i></a> ';
							return e + a + d;
						}
					} ]
			});
}
function reLoad() {
	load();
}
function add(pId) {
	layer.open({
		type : 2,
		title : '添加选择单位',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add?parentId='+pId // iframe的url
	});
}
function saveAddedDept(deptId,name,parentId) {
	$.ajax({
		cache : true,
		type : "POST",
		url :  prefix +"/save",
		data : {
			rdcId: $('#rdcId').val(),
			parentId: parentId,
			deptId: deptId,
			sname: name
		},
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
//				parent.reLoad();
//				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
//				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}
			reLoad();
		}
	});

}
function batchAddedDepts(deptIds) {
	$.ajax({
		cache : true,
		type : "POST",
		url :  prefix +"/batchAddToDepts",
		data : {
			rdcId: $('#rdcId').val(),
			"ids" : deptIds
		},
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				reLoad();
			} else {
				parent.layer.alert(data.msg)
			}
			
		}
	});

}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}
function removeone(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/remove",
			type : "post",
			data : {
				'rdId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

//function batchRemove() {
//	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
//	if (rows.length == 0) {
//		layer.msg("请选择要删除的数据");
//		return;
//	}
//	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
//		btn : [ '确定', '取消' ]
//	// 按钮
//	}, function() {
//		var ids = new Array();
//		// 遍历所有选择的行数据，取每条数据对应的ID
//		$.each(rows, function(i, row) {
//			ids[i] = row['rdId'];
//		});
//		$.ajax({
//			type : 'POST',
//			data : {
//				"ids" : ids
//			},
//			url : prefix + '/batchRemove',
//			success : function(r) {
//				if (r.code == 0) {
//					layer.msg(r.msg);
//					reLoad();
//				} else {
//					layer.msg(r.msg);
//				}
//			}
//		});
//	}, function() {
//
//	});
//}