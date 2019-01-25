var prefix = "/system/labourreportmain"
$(function() {
	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format : 'yyyy-MM'
	});
	load();
});

function load() {
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
						bordered : true,
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
								renderdate : ($('#renderdate').val() == null || $(
										'#renderdate').val() == '') ? $(
										'#renderdate').val() : $('#renderdate')
										.val()
										+ '-01',
								renderdepart : $('#renderdepart').val(),
								code : $("#code").val(),
								status : $("#status").val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								{
									field : 'oid',
									title : '主键',
									align : 'center',
									visible : false
								},
								{
									field : 'code',
									title : '编号',
									align : 'center',
									visible : false
								},
								{
									field : 'renderdepart',
									title : '单位名称',
									align : 'center'
								},
								{
									field : 'renderdate',
									title : '汇报时间',
									align : 'center',
									formatter : function(value, row, index) {
										var val = value;
										if (val != null) {
											var date = new Date(val);
											return date.getFullYear() + '年'
													+ (date.getMonth() + 1)
													+ '月';
										}
									}
								},
								{
									field : 'status',
									title : '状态',
									align : 'center',
									formatter : function(value, row, index) { // 单元格格式化函数
										// 0未提交，1已提交，2已审核通过，3审核未通过
										var text = '-';
										if (value == 1) {
											text = "已提交";
										} else if (value == 2) {
											text = "已审核通过";
										} else if (value == 3) {
											text = "审核未通过";
										} else if (value == 0) {
											text = "未提交";
										} else {
											text = "未提交";
										}
										return text;
									}
								},
								{
									field : 'mineleader',
									title : '矿负责人',
									align : 'center',
									visible : false
								},
								{
									field : 'businessleader',
									title : '业务部门负责人',
									align : 'center',
									visible : false
								},
								{
									field : 'edituser',
									title : '制表人',
									align : 'center',
									visible : false
								},
								{
									field : 'edittime',
									title : '制表时间',
									align : 'center',
									visible : false
								},
								{
									field : 'upttime',
									title : '更新时间',
									align : 'center',
									visible : false
								},
								{
									field : 'uptuser',
									title : '操作人',
									align : 'center',
									visible : false
								},
								{
									field : 'remark',
									title : '说明',
									align : 'center',
									visible : false
								},
								{
									field : 'ext1',
									title : '备用1',
									visible : false
								},
								{
									field : 'ext2',
									title : '备用2',
									visible : false
								},
								{
									field : 'ext3',
									title : '备用3',
									visible : false
								},
								{
									title : '操作',
									field : 'id',
									align : 'left',
									halign : 'center',
									formatter : function(value, row, index) {
										s_edit_h = '';
										s_remove_h = '';
										var curCode = row.code;
										var rol = $("#status").val();
										var temp = 0; // 控制报表可写操作，1可写，0不可写
										var checksubmit = ''; // 提交按钮控制
										if (row.status == 1 || row.status == 2) {
											checksubmit = 'hidden';
											s_edit_h = 'hidden';
											s_remove_h = 'hidden';
										}
										var checkapprove = ''; // 审批按钮控制
										if (row.status != 1)
											checkapprove = 'hidden';
										var approverecord = ''; // 审批记录按钮控制
										if (row.status == 0)
											approverecord = 'hidden';
										if (rol == '5') { // 可填报报表数据管理员
											if (row.status == 0
													|| row.status == 3)
												temp = 1;
											checkapprove = 'hidden';
										} else if (rol == '6') { // 可填报报表数据审批管理员
											if (row.status == 1)
												temp = 1;
											checksubmit = 'hidden';
											s_remove_h = 'hidden';
										}

										var e = '<a class="btn btn-primary btn-sm '
												+ s_edit_h
												+ '" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.oid
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '
												+ s_remove_h
												+ '" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.oid
												+ '\',\''
												+ row.code
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var curUrl = urlrunqiantb + "raq="
												+ curCode + "&moid=" + row.oid
												+ "&cdate=" + row.renderdate
												+ "&cdepart=" + row.ext1
												+ "&IsWrite=" + temp;
										var g = '<a class="btn btn-warning btn-sm '
												+ s_detail_h
												+ '" href="#" title="报表"  mce_href="#" onclick="reportfunc(\''
												+ curUrl
												+ '\')"><i class="fa fa-tasks"></i></a> ';
										var adminUrl = urlrunqiantb + "raq="
												+ curCode + "&moid=" + row.oid
												+ "&cdate=" + row.renderdate
												+ "&cdepart=" + row.ext1
												+ "&IsWrite=1";
										var adming = '<a class="btn btn-success btn-sm '
												+ s_admindetail_h
												+ '" href="#" title="管理员报表"  mce_href="#" onclick="reportfunc(\''
												+ adminUrl
												+ '\')"><i class="fa fa-tasks"></i></a> ';

										if (curCode == '10005') {
											var suburl = urlrunqiantb
													+ "raq=10015&moid="
													+ row.oid + "&cdate="
													+ row.renderdate
													+ "&cdepart=" + row.ext1
													+ "&IsWrite=" + temp;
											g = '<a class="btn btn-warning btn-sm '
													+ s_detail_h
													+ '" href="#" title="报表"  mce_href="#" onclick="report5confirm(\''
													+ curUrl
													+ '\',\''
													+ suburl
													+ '\')"><i class="fa fa-tasks"></i></a> ';
											var adminsuburl = urlrunqiantb
													+ "raq=10015&moid="
													+ row.oid + "&cdate="
													+ row.renderdate
													+ "&cdepart=" + row.ext1
													+ "&IsWrite=1";
											adming = '<a class="btn btn-success btn-sm '
													+ s_admindetail_h
													+ '" href="#" title="管理员报表"  mce_href="#" onclick="report5confirm(\''
													+ adminUrl
													+ '\',\''
													+ adminsuburl
													+ '\')"><i class="fa fa-tasks"></i></a> ';
										}
										var h = '<a class="btn btn-warning btn-sm '
												+ s_sumitinfo_h
												+ ' '
												+ checksubmit
												+ '" href="#" title="提交"  mce_href="#" onclick="submitinfo(\''
												+ row.oid
												+ '\')"><i class="fa fa-check-square-o"></i></a> ';
										var i = '<a class="btn btn-warning btn-sm '
												+ s_suggest_h
												+ ' '
												+ checkapprove
												+ '" href="#" title="审批"  mce_href="#" onclick="approveopt(\''
												+ row.oid
												+ '\')"><i class="fa fa-anchor"></i></a> ';
										var j = '<a class="btn btn-warning btn-sm '
												+ s_approve_h
												+ ' '
												+ approverecord
												+ '" href="#" title="审批记录"  mce_href="#" onclick="suggest(\''
												+ row.oid
												+ '\')"><i class="fa fa-envelope-o"></i></a> ';
										return e + d + g + h + i + j + adming;
									}
								} ]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function add() {
	var curCode = $("#code").val();
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add?Code=' + curCode // iframe的url
	});
}
function reportfunc(url) {
	var index = layer.open({
		type : 2,
		title : '报表明细',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : url
	});
	layer.full(index);
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
function remove(id, code) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove",
			type : "post",
			data : {
				'oid' : id,
				'Code' : code
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
function submitinfo(id) {
	layer.open({
		type : 2,
		title : '提交',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/sumitinfo?oid=' + id // iframe的url
	});
}
function suggest(id) {
	layer.open({
		type : 2,
		title : '审批记录',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : '/system/labourrepotapprove?foid=' + id // iframe的url
	});
}

function approveopt(id) {
	layer.open({
		type : 2,
		title : '审批',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/approveopt?oid=' + id // iframe的url
	});
}
function report5confirm(murl, surl) {
	layer.confirm('选择要查看的表格', {
		btn : [ '主表', '附表' ],
		skin : 'layui-layer-molv'
	// 按钮
	}, function(curindex) {
		layer.close(curindex);
		var index = layer.open({
			type : 2,
			title : '报表明细',
			maxmin : true,
			shadeClose : false, // 点击遮罩关闭层
			area : [ '800px', '520px' ],
			content : murl
		});
		layer.full(index);

	}, function() {
		var index = layer.open({
			type : 2,
			title : '报表明细',
			maxmin : true,
			shadeClose : false, // 点击遮罩关闭层
			area : [ '800px', '520px' ],
			content : surl
		});
		layer.full(index);
	});
}
