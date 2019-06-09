var prefix = "/system/userRole";
layui
		.use(
				[ 'form', 'layer', 'table', 'laytpl' ],
				function() {
					var form = layui.form, layer = layui.layer, $ = layui.jquery, laytpl = layui.laytpl, table = layui.table;
					// 用户列表
					var tableIns = table.render({
						elem : '#roleUserList',
						url : prefix + "/listUnInRole",
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
					$(".addNews_btn")
							.click(
									function() {
										var checkStatus = table
												.checkStatus('roleUserListTable'), data = checkStatus.data, ArrayData = [];
										if (data.length > 0) {
											for ( var i in data) {
												ArrayData.push(data[i].userId);
											}
											$.post(prefix + "/insertlist", {
												ids : ArrayData,
												roleId : $("#roleId").val()
											}, function(res) {
												top.layer.msg(res.msg);
												if (res.code == 0) {
													layer.closeAll("iframe");
													// 刷新父页面
													parent.location.reload();
												}
											});
										} else {
											layer.msg("请至少选择一条记录！");
										}
									});
				});
