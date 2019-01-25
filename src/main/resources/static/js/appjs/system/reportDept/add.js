var prefix = "/system/sysDept"

$().ready(function() {
	load();
	});
function load() {
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/list", // 服务器数据的加载地址
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						singleSelect : false, // 设置为true将禁止多选
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								parentId : $('#parentId').val(),
//								limit: params.limit,
								offset: 0,
								limit: 200,
//								offset:params.offset,
								name : $('#searchName').val()
							};
						},
						columns : [
							{
								checkbox : true
							},
							{
								title : '编号',
								field : 'deptId',
								visible : false
							},
							{
								field : 'name',
								title : '单位名称',
		                        valign : 'center',
								witth :20
							},
							{
								field : 'delFlag',
								title : '状态',
								align : 'center',
		                        valign : 'center',
								formatter : function(value, row, index) {
									if (value == 0) {
										return '<span class="label label-danger">禁用</span>';
									} else if (value == 1) {
										return '<span class="label label-primary">正常</span>';
									}
								}
							},
							{
								title : '操作',
								field : 'id',
								align : 'center',
		                        valign : 'center',
								formatter : function(value, row, index) {
									var e = '<a class="btn btn-primary btn-sm " href="#" mce_href="#" title="选择" onclick="selected(\''
											+ row.deptId+ '\''+','+'\''
											+ row.name+ '\''
											+ ')"><i class="fa fa-check-square-o"></i></a> ';
									return e ;
								}
							} ]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function selected(deptId,name) {
	parent.saveAddedDept(deptId,name,$('#parentId').val());
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.close(index);
}
function batchAdd()
{
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要添加的单位部门数据");
		return;
	}
	layer.confirm("确认要添加选中的'" + rows.length + "'条单位部门数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['deptId'];
		});
		parent.batchAddedDepts(ids);
		var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
		parent.layer.close(index);
	}, function() {});
}
