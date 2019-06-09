var prefix = "/system/userRole";
layui
		.use(
				[ 'form', 'layer', 'table', 'laytpl' ],
				function() {
					var form = layui.form, layer = layui.layer, $ = layui.jquery, laytpl = layui.laytpl, table = layui.table;
					// 用户列表
					var tableIns = table.render({
						elem : '#roleUserList',
						url : prefix + "/list",
						where : {
							roleId : $("#roleId").val(),
							username : $("#username").val(),
							sort : 'username',
							order : 'asc'
						},
						cellMinWidth : 95,
						page : true,
						even : true,
						height : "full-100",
						limits : [ 5, 10, 15, 20, 25 ],
						limit : 10,
						id : "roleUserListTable",
						done : function(res, curr, count) {
						},
						response : {
							statusName : 'code', // 规定数据状态的字段名称，默认：code
							statusCode : 0, // 规定成功的状态码，默认：0
							msgName : 'msg', // 规定状态信息的字段名称，默认：msg
							countName : 'total', // 规定数据总数的字段名称，默认：count
							dataName : 'rows' // 规定数据列表的字段名称，默认：data
						},
						cols : [ [ {
							type : "checkbox",
							fixed : "left",
							width : 50
						}, {
							field : 'relateId',
							title : 'relateId',
							align : "center",
							hide : true
						}, {
							field : 'roleId',
							title : '角色ID',
							align : "center",
							hide : true
						}, {
							field : 'userId',
							title : '用户ID',
							align : "center",
							hide : true
						}, {
							field : 'username',
							title : '用户名',
							align : "center"
						}, {
							field : 'usernikename',
							title : '用户昵称',
							align : "center"
						}, {
							title : '操作',
							width : 120,
							templet : '#roleUserListBar',
							fixed : "right",
							align : "center"
						} ] ]
					});
					$(".search_btn").on("click", function() {
						table.reload("roleUserListTable", {
							page : {
								curr : 1
							},
							where : {
								roleId : $("#roleId").val(),
								username : $("#username").val()
							}
						});
					});
					function addData() {
						var index = layer.open({
							title : "添加用户",
							type : 2,
							content : prefix + "/addUser?roleId="
									+ $("#roleId").val(),
							area : [ "600px", "400px" ]
						});
						layer.full(index);
					}
					;
					$(".addNews_btn").click(function() {
						addData();
					});
					$(".delAll_btn")
							.click(
									function() {
										var checkStatus = table
												.checkStatus('roleUserListTable'), data = checkStatus.data, ArrayData = [];
										if (data.length > 0) {
											for ( var i in data) {
												ArrayData
														.push(data[i].relateId);
											}
											layer
													.confirm(
															'确定删除选中的记录？',
															{
																icon : 3,
																title : '提示信息'
															},
															function(index) {
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
					function del(id) {
						layer.confirm('确定删除此用户？', {
							icon : 3,
							title : '提示信息'
						}, function(index) {
							$.post(prefix + "/remove", {
								relateId : id
							}, function(res) {
								layer.msg(res.msg);
								layer.close(index);
								if (res.code == 0) {
									tableIns.reload();
								}
							});
						});
					}
					table.on('tool(roleUserList)', function(obj) {
						var layEvent = obj.event, data = obj.data;
						switch (layEvent) {
						case "del":
							del(data.relateId);
							break;
						}
					});
				});
