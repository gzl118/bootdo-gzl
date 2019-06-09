var prefix = "/system/menu";
layui
		.config({
			base : '/js/plugins/layui/extend/',
		})
		.extend({
			treeGrid : 'treeGrid'
		})
		.use(
				[ 'jquery', 'layer', 'treeGrid' ],
				function() {
					var layer = layui.layer, $ = layui.jquery, treeGrid = layui.treeGrid;
					var ptable = treeGrid.render({
						id : 'menuListTable',
						elem : '#menuList',
						idField : 'menuId',
						url : prefix + "/list",
						cellMinWidth : 100,
						treeId : 'menuId',// 树形id字段名称
						where : {
							sort : 'ordernum',
							deleteflag : 1,
							limit : -1
						},
						treeUpId : 'parentId',// 树形父id字段名称
						treeShowName : 'menuname',// 以树形式显示的字段
						isPage : false,
						isOpenDefault : false,
						iconOpen : false,
						method : 'get',
						loading : true,
						isFilter : false,
						response : {
							statusName : 'code', // 规定数据状态的字段名称，默认：code
							statusCode : 0, // 规定成功的状态码，默认：0
							msgName : 'msg', // 规定状态信息的字段名称，默认：msg
							countName : 'total', // 规定数据总数的字段名称，默认：count
							dataName : 'rows' // 规定数据列表的字段名称，默认：data
						},
						height : "full-80",
						// heightRemove : [ ".layui-elem-quote", 60
						// ],
						cols : [ [
								{
									type : 'checkbox'
								},
								{
									field : 'menuname',
									title : '部门名称'
								// ,align : "center"
								},
								{
									field : 'menuicon',
									title : '图标',
									align : "center",
									templet : function(d) {
										var r = '<i class="' + d.menuicon
												+ '"></i>';
										return r;
									}
								},
								{
									field : 'menutype',
									title : '类型',
									align : "center",
									templet : function(d) {
										var r = "";
										var c = "";
										switch (d.menutype) {
										case 0:
											r = "目录";
											c = "layui-btn-normal";
											break;
										case 1:
											r = "菜单";
											c = "";
											break;
										case 2:
											r = "按钮";
											c = "layui-btn-warm";
											break;
										}
										return '<span class="layui-btn layui-btn-xs ' + c + '">' + r
												+ '</span>';
									}
								}, {
									field : 'menuurl',
									title : '地址',
									align : "center"
								}, {
									field : 'menuperms',
									title : '权限',
									align : "center"
								}, {
									field : 'ordernum',
									title : '顺序',
									align : "center"
								}, {
									title : '操作',
									width : 220,
									templet : '#menuListBar',
									fixed : "right",
									align : "center"
								} ] ]
					});
					$(".search_btn").on("click", function() {
						treeGrid.reload("menuListTable", {
							page : {
								curr : 1
							},
							where : {
								menuname : $("#searchName").val()
							}
						});
					});
					$(".addNews_btn").click(function() {
						addData(0);
					});
					$(".order_btn").click(function() {
						// var index = layer.open({
						// title : "调整顺序",
						// type : 2,
						// maxmin : true,
						// content : prefix + "/menuTreeDrap",
						// area : [ "600px", "400px" ]
						// });
						// layer.full(index);
					});
					function treereload() {
						treeGrid.reload("menuListTable", {});
					}
					$(".delAll_btn")
							.click(
									function() {
										var checkStatus = treeGrid
												.checkStatus('menuListTable'), data = checkStatus.data, ArrayData = [];
										if (data.length > 0) {
											for ( var i in data) {
												ArrayData.push(data[i].menuId);
											}
											layer.confirm('确定删除选中的记录？', {
												icon : 3,
												title : '提示信息'
											}, function(index) {
												$.post(prefix + "/batchRemove",
														{
															ids : ArrayData
														}, function(res) {
															layer.msg(res.msg);
															layer.close(index);
															if (res.code == 0) {
																treereload();
															}
														});
											});
										} else {
											layer.msg("请至少选择一条记录！");
										}
									});
					function addData(id) {
						var index = layer.open({
							title : "添加",
							type : 2,
							maxmin : true,
							content : prefix + "/add/" + id,
							area : [ "600px", "400px" ]
						});
						layer.full(index);
					}
					;
					function editData(id) {
						var index = layer.open({
							title : "编辑",
							type : 2,
							maxmin : true,
							content : prefix + "/edit/" + id,
							area : [ "600px", "400px" ]
						});
						layer.full(index);
					}
					;
					function setbtn(id) {
						var index = layer.open({
							title : "设置按钮",
							type : 2,
							maxmin : true,
							content : prefix + "/menuBtn/" + id,
							area : [ "600px", "400px" ]
						});
						layer.full(index);
					}
					;
					function del(id) {
						layer.confirm('确定删除此记录？', {
							icon : 3,
							title : '提示信息'
						}, function(index) {
							$.post(prefix + "/remove", {
								id : id
							}, function(res) {
								layer.msg(res.msg);
								layer.close(index);
								if (res.code == 0) {
									treereload();
								}
							});
						});
					}
					;
					function getData(data) {
						var arr = new Array();
						if (data) {
							arr.push(data.menuId);
							if (data.children && data.children.length > 0) {
								for (var i = 0; i < data.children.length; i++) {
									arr = arr.concat(getData(data.children[i]));
								}
							}
						}
						return arr;
					}
					;
					treeGrid.on('tool(menuList)', function(obj) {
						var layEvent = obj.event, data = obj.data;
						switch (layEvent) {
						case "add":
							addData(data.menuId);
							break;
						case "edit":
							editData(data.menuId);
							break;
						case "set":
							setbtn(data.menuId);
							break;
						case "del":
							if (data.children.length == 0)
								del(data.menuId);
							else {
								layer.confirm(
										'确定删除选中的记录(该节点有子节点，删除该节点会将子节点一起删除)？', {
											icon : 3,
											title : '提示信息'
										}, function(index) {
											var ArrayData = getData(data);
											if (ArrayData.length > 0)
												$.post(prefix + "/batchRemove",
														{
															ids : ArrayData
														}, function(res) {
															layer.msg(res.msg);
															layer.close(index);
															if (res.code == 0) {
																treereload();
															}
														});

										});
							}
							break;
						}
					});
					$(".order_btn").click(function() {
						var index = layer.open({
							title : "调整顺序",
							type : 2,
							maxmin : true,
							content : prefix + "/menuTreeDrap",
							area : [ "600px", "400px" ]
						});
						layer.full(index);
					});
				});
