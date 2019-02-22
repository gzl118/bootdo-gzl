var prefix = "/sys/user";

require.config({
	paths : {}
});
require(
		[ "jquery", 'layui' ],
		function($) {
			layui
					.use(
							[ 'form', 'layer', 'table', 'laytpl' ],
							function() {
								var form = layui.form, layer = parent.layer === undefined ? layui.layer
										: top.layer, $ = layui.jquery, laytpl = layui.laytpl, table = layui.table;
								// 用户列表
								var tableIns = table
										.render({
											elem : '#userList',
											url : prefix + "/list",
											cellMinWidth : 95,
											page : true,
											where : {
												sort : 'username',
												order : 'asc',
												deleteflag : 1
											},
											even : true,
											height : "full-120",
											limits : [ 5, 10, 15, 20, 25 ],
											limit : 5,
											id : "userListTable",
											response : {
												statusName : 'code', // 规定数据状态的字段名称，默认：code
												statusCode : 0, // 规定成功的状态码，默认：0
												msgName : 'msg', // 规定状态信息的字段名称，默认：msg
												countName : 'total', // 规定数据总数的字段名称，默认：count
												dataName : 'rows' // 规定数据列表的字段名称，默认：data
											},
											done : function(res, curr, count) {
											},
											cols : [ [
													{
														type : "checkbox",
														fixed : "left",
														width : 50
													},
													{
														field : 'username',
														title : '用户名',
														minWidth : 100,
														align : "center"
													},
													{
														field : 'usernikename',
														title : '用户昵称',
														align : 'center',
														minWidth : 150
													},
													{
														field : 'userstatus',
														title : '状态',
														align : 'center',
														minWidth : 50,
														templet : function(d) {
															return d.userstatus === 1 ? '<span class="label label-primary">正常</span>'
																	: '<span class="label label-danger">停用</span>';
														}
													},
													{
														title : '操作',
														width : 220,
														templet : '#userListBar',
														fixed : "right",
														align : "center"
													} ] ]
										});
								;
								$(".search_btn").on(
										"click",
										function() {
											table.reload("userListTable", {
												page : {
													curr : 1
												},
												where : {
													username : $("#username")
															.val(),
													usernikename : $(
															"#usernikename")
															.val()
												}
											});
										});
								$(".addNews_btn").click(function() {
									addData();
								});
								$(".delAll_btn")
										.click(
												function() {
													var checkStatus = table
															.checkStatus('userListTable'), data = checkStatus.data, ArrayData = [];
													if (data.length > 0) {
														for ( var i in data) {
															ArrayData
																	.push(data[i].userId);
														}
														layer
																.confirm(
																		'确定删除选中的用户？',
																		{
																			icon : 3,
																			title : '提示信息'
																		},
																		function(
																				index) {
																			$
																					.post(
																							prefix
																									+ "/batchRemove",
																							{
																								ids : ArrayData
																							},
																							function(
																									res) {
																								layer
																										.msg(res.msg);
																								layer
																										.close(index);
																								if (res.code == 0) {
																									tableIns
																											.reload();
																								}
																							});
																		});
													} else {
														layer.msg("请至少选择一条记录！");
													}
												});
								function addData() {
									var index = layui.layer.open({
										title : "添加用户",
										type : 2,
										content : prefix + "/add",
										area : [ "600px", "400px" ]
									});
								}
								;
								function editData(id) {
									var index = layui.layer.open({
										title : "编辑用户",
										type : 2,
										content : prefix + "/edit/" + id,
										area : [ "600px", "400px" ]
									});
								}
								;
								function del(id) {
									layer.confirm('确定删除此用户？', {
										icon : 3,
										title : '提示信息'
									}, function(index) {
										$.post(prefix + "/remove", {
											userId : id
										}, function(res) {
											layer.msg(res.msg);
											layer.close(index);
											if (res.code == 0) {
												tableIns.reload();
											}
										});
									});
								}
								;
								function usable(data) {
									var t = data.userstatus == 1 ? '禁用' : '启用';
									var targetstatus = data.userstatus == 1 ? 0
											: 1;
									var id = data.userId;
									layer.confirm('确定' + t + '此用户？', {
										icon : 3,
										title : '提示信息'
									}, function(index) {
										$.post(prefix + "/update", {
											userId : id,
											userstatus : targetstatus
										}, function(res) {
											layer.msg(res.msg);
											layer.close(index);
											if (res.code == 0) {
												tableIns.reload();
											}
										});
									});
								}
								;
								function resetpwd(id) {
									layer.confirm('确定重置此用户的密码，重置后原密码将无法登陆？', {
										icon : 3,
										title : '提示信息'
									}, function(index) {
										$.post(prefix + "/adminresetpwd", {
											userId : id
										}, function(res) {
											layer.msg(res.msg);
											layer.close(index);
											if (res.code == 0) {
												tableIns.reload();
											}
										});
									});
								}
								table.on('tool(userList)', function(obj) {
									var layEvent = obj.event, data = obj.data;
									switch (layEvent) {
									case "edit":
										editData(data.userId);
										break;
									case "del":
										del(data.userId);
										break;
									case "usable":
										usable(data);
										break;
									case "resetpwd":
										resetpwd(data.userId);
										break;
									}
								});
							});
		});
