var prefix = "/system/kbDept"
$(function() {
	$("#deptGroupId").chosen({
		maxHeight : 200
	});
	selectLoad();
	load();
});
function selectLoad() {
	var html = "";
	$.ajax({
		url : '/system/kbGroup/grouplist',
		data : {
			limit : 1000,
			offset : 0
		},
		cache : false,
		success : function(data) {
			// 没有数据，加载自定义的单位列表
			if (data.length < 1) {
				// $("#deptGroupId").empty();
				html += '<option value="-1" selected >全部</option>';
				$("#deptGroupId").append(html);
				$("#deptGroupId").trigger("chosen:updated");
				return;
			}
			// $("#deptGroupId").empty();
			html += '<option value="-1" selected >全部</option>';
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].oid + '">' + data[i].cname
						+ '</option>';
			}

			$("#deptGroupId").append(html);
			$("#deptGroupId").trigger("chosen:updated");
		}
	});
}
function load() {
	var code = $("#code").val();
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/list", // 服务器数据的加载地址
						// showRefresh : true,
						// showToggle : true,
						// showColumns : true,
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : false, // 设置为true将禁止多选
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						// search : true, // 是否显示搜索框
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
						// "server"
						queryParams : function(params) {
							return {
								// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit : params.limit,
								offset : params.offset,
								foid : $('#foid').val(),
								ext1 : $('#ext1').val(),
								deptGroupId : $('#deptGroupId').val() == '-1' ? ''
										: $('#deptGroupId').val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								// {
								// checkbox : true
								// },
								{
									field : 'oid',
									title : 'oid',
									visible : false
								},
								{
									field : 'foid',
									title : '外键',
									visible : false
								},
								{
									field : 'deptId',
									title : '单位编号',
									visible : false
								},
								{
									field : 'deptGroupId',
									title : '分组编号',
									visible : false
								},
								{
									field : 'ext1',
									title : '单位名称',
									align : 'center'
								},
								{
									field : 'ext3',
									title : '单位分类',
									align : 'center'
								},
								{
									field : 'ext2',
									title : '分组名称',
									align : 'center'
								},
								{
									field : 'norder',
									title : '顺序',
									align : 'center'
								},
								{
									field : 'ntype',
									title : '类型',
									align : 'center',
									formatter : function(value, row, index) { // 单元格格式化函数
										// 0集团本部，1股份公司
										var text = '-';
										if (code == '20006') {
											if (value == 0) {
												text = "矿合计";
											} else if (value == 1) {
												text = "选煤厂合计";
											}
										} else {
											if (value == 0) {
												text = "集团本部";
											} else if (value == 1) {
												text = "股份公司";
											}
										}
										return text;
									}
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var e = '<a class="btn btn-primary btn-sm '
												+ s_edit_h
												+ '" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.oid
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '
												+ s_remove_h
												+ '" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.oid
												+ '\')"><i class="fa fa-remove"></i></a> ';
										return e + d;
									}
								} ]
					});
}
function reLoad() {
	var path = prefix + "/list";
	$('#exampleTable').bootstrapTable('refresh', {
		url : path
	});
	// $("#exampleTable").bootstrapTable('refreshOptions', {
	// pageNumber : 1
	// });
}
function add() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add?foid=' + $("#foid").val() + '&code='
				+ $("#code").val() // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id + '?code=' + $("#code").val() // iframe的url
	});
}
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove",
			type : "post",
			data : {
				'oid' : id
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd(id) {
}
function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['oid'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}