var prefix = "/system/staff";

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
											elem : '#staffList',
											url : prefix + "/list",
											cellMinWidth : 95,
											page : true,
											even : true,
											where : {
												deleteflag : 1
											},
											height : "full-120",
											limits : [ 5, 10, 15, 20, 25 ],
											limit : 5,
											id : "staffListTable",
											done : function(res, curr, count) {
											},
											cols : [ [
													{
														type : "checkbox",
														fixed : "left",
														width : 50
													},
													{
														field : 'employeeId',
														title : '员工编号',
														align : "center",
														hide : true
													},
													{
														field : 'deptId',
														title : '部门编号',
														align : "center",
														hide : true
													},
													{
														field : 'employeename',
														title : '员工姓名',
														align : "center"
													},
													{
														field : 'estatus',
														title : '状态',
														align : "center",
														templet : function(d) {
															return d.estatus === 0 ? '<span class="label label-primary">在职</span>'
																	: '<span class="label label-danger">离职</span>';
														}
													},
													{
														field : 'sex',
														title : '性别',
														align : "center",
														templet : function(d) {
															return d.sex === 0 ? '<span class="label label-primary">男</span>'
																	: '<span class="label label-warning">女</span>';
														}
													},
													{
														field : 'birthday',
														title : '用户生日',
														align : "center",
														templet : function(data) {
															if (data.birthday == null)
																return '';
															var d = new Date(
																	data.birthday);
															var year = d
																	.getFullYear();
															var month = d
																	.getMonth();
															month++;
															var day = d
																	.getDate();
															month = month < 10 ? "0"
																	+ month
																	: month;
															day = day < 10 ? "0"
																	+ day
																	: day;
															var time = year
																	+ "-"
																	+ month
																	+ "-" + day;

															return time;
														}
													},
													{
														field : 'email',
														title : 'Email',
														align : "center"
													},
													{
														field : 'qq',
														title : 'QQ',
														align : "center"
													},
													{
														field : 'wx',
														title : '微信号',
														align : "center"
													},
													{
														field : 'photo',
														title : '照片',
														align : "center"
													},
													{
														field : 'telphone',
														title : '手机号',
														align : "center"
													},
													{
														field : 'professionaltitle',
														title : '职称',
														align : "center"
													},
													{
														field : 'educational',
														title : '学历',
														align : "center"
													},
													{
														field : 'duty',
														title : '职务',
														align : "center"
													},
													{
														title : '操作',
														width : 120,
														templet : '#staffListBar',
														fixed : "right",
														align : "center"
													} ] ]
										});
								;
								$(".search_btn").on(
										"click",
										function() {
											table.reload("staffListTable", {
												page : {
													curr : 1
												},
												where : {
													telphone : $("#telphone")
															.val(),
													employeename : $(
															"#employeename")
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
															.checkStatus('staffListTable'), data = checkStatus.data, ArrayData = [];
													if (data.length > 0) {
														for ( var i in data) {
															ArrayData
																	.push(data[i].employeeId);
														}
														layer
																.confirm(
																		'确定删除选中的记录？',
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
										area : [ "800px", "600px" ]
									});
								}
								;
								function editData(id) {
									var index = layui.layer.open({
										title : "编辑用户",
										type : 2,
										content : prefix + "/edit/" + id,
										area : [ "800px", "600px" ]
									});
								}
								;
								function del(id) {
									layer.confirm('确定删除此用户？', {
										icon : 3,
										title : '提示信息'
									}, function(index) {
										$.post(prefix + "/remove", {
											employeeId : id
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
								table.on('tool(staffList)', function(obj) {
									var layEvent = obj.event, data = obj.data;
									switch (layEvent) {
									case "edit":
										editData(data.employeeId);
										break;
									case "del":
										del(data.employeeId);
										break;
									}
								});
							});
		});
