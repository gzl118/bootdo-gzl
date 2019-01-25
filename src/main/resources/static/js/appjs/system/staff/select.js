
var prefix = "/system/staff";
//	$(function() {
//		load();
//	});
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
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								name : $('#searchName').val()
							};
						},
						columns : [
								{
									checkbox : true
								},
																{
									field : 'staffId', 
									title : '序号' 
								},
								{
									field : 'deptId', 
									title : '' 
								},
																{
									field : 'name', 
									title : '姓名' 
								},
//																{
//									field : 'sex', 
//									title : '性别',
//									align : 'center',
//									formatter : function(value, row, index) {
//										if (value == '0') {
//											return '<span class="label">女</span>';
//										} else if (value == '1') {
//											return '<span class="label">男</span>';
//										}
//									}
//								},
//																{
//									field : 'staffIdCreate', 
//									title : '创建时间' 
//								},
//																{
//									field : 'staffIdModified', 
//									title : '修改时间' 
//								},
																{
									field : 'deptName', 
									title : '单位' 
								},
//																{
//									field : 'education', 
//									title : '学历' 
//								},
//																{
//									field : 'zc', 
//									title : '职称' 
//								},
//																{
//									field : 'zw', 
//									title : '职务' 
//								},
																{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var e = '<a class="btn btn-primary btn-sm " href="#" mce_href="#" title="选择" onclick="selected(\''
												+ row.staffId+ '\''+','+'\''
												+ row.name+ '\''+','+'\''
												+ row.deptId+ '\''+','+'\''
												+ row.deptName+ '\''
												+ ')"><i class="fa fa-edit"></i></a> ';
										return e  ;
									}
								} ]
					});
//  $('#exampleTable').bootstrapTable('showColumn', 'ShopName');
    $('#exampleTable').bootstrapTable('hideColumn', 'deptId');
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function selected(sid,name,did,dname) {
	parent.loadStaffAndDept(sid,name,did,dname);
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.close(index);
}
