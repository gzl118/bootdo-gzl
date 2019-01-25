
var prefix = "/sys/roleuser";
$(function() {
	var roleId = '';
	roleId=$("#roleId").val();
//	alert(roleId);
	load(roleId);
});
function load(roleId) {
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
								name : $('#userName').val(),
								roleId: roleId
							};
						},
						columns : [
								{
									checkbox : true
								},
																{
									field : 'id', 
									title : '序号' 
								},
								{
									field : 'username', 
									title : '用户名' 
								},
																{
									field : 'name', 
									title : '人员名' 
								},
//																{
//									field : 'deptName', 
//									title : '单位' 
//								},
																{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var e = '<a class="btn btn-warning btn-sm " href="#" mce_href="#" title="删除" onclick="remove(\''
												+ row.id+ '\''
												+ ')"><i class="fa fa-remove"></i></a> ';
										return e  ;
									}
								} ]
					});
//  $('#exampleTable').bootstrapTable('showColumn', 'ShopName');
//    $('#exampleTable').bootstrapTable('hideColumn', 'id');
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function selected(sid,name,did,dname) {
	parent.loadStaffAndDept(sid,name,did,dname);
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.close(index);
}
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code === 0) {
					layer.msg("删除成功");
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}
function add() {
	// iframe层
	layer.open({
		type : 2,
		title : '添加角色成员',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '750px', '480px' ],
		content : prefix + '/add/'+ $("#roleId").val()// iframe的url
	});
}
