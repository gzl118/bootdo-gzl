var prefix = "/system/dept";
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
						id : 'deptListTable',
						elem : '#deptList',
						idField : 'deptId',
						url : prefix + "/list",
						cellMinWidth : 100,
						treeId : 'deptId',// 树形id字段名称
						where : {
							sort : 'ordernum',
							deleteflag : 1,
							limit : -1
						},
						treeUpId : 'parentId'// 树形父id字段名称
						,
						treeShowName : 'deptname'// 以树形式显示的字段
						,
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
						/*
						 * { type : 'numbers' }, { type : 'radio', width : 60 },
						 */
						{
							type : 'checkbox'
						},
						/*
						 * { field : 'deptId', title : '部门编号', align : "center",
						 * hide : true },
						 */
						{
							field : 'deptname',
							title : '部门名称'
						// ,align : "center"
						}, {
							field : 'deptdesc',
							title : '描述',
							align : "center"
						},
						/*
						 * {field : 'parentId', title : '父级编号',align :
						 * "center"},
						 */
						{
							field : 'ordernum',
							title : '顺序',
							align : "center"
						}, {
							title : '操作',
							width : 120,
							templet : '#deptListBar',
							fixed : "right",
							align : "center"
						} ] ]
					/*
					 * , parseData : function(res) {// 数据加载后回调 return res; },
					 * onClickRow : function(index, o) { console.log(index, o,
					 * "单击！"); // msg("单击！,按F12，在控制台查看详细参数！"); }, onDblClickRow :
					 * function(index, o) { console.log(index, o, "双击");
					 * msg("双击！,按F12，在控制台查看详细参数！"); }, onCheck : function(obj,
					 * checked, isAll) {// 复选事件 console.log(obj, checked, isAll,
					 * "复选"); msg("复选,按F12，在控制台查看详细参数！"); }, onRadio :
					 * function(obj) {// 单选事件 console.log(obj, "单选");
					 * msg("单选,按F12，在控制台查看详细参数！"); }
					 */
					});
					/*
					 * function msg(msg) { var loadIndex = layer.msg(msg, { time :
					 * 3000, offset : 'b'// 顶部 , shade : 0 }); }
					 */
					$(".search_btn").on("click", function() {
						treeGrid.reload("deptListTable", {
							page : {
								curr : 1
							},
							where : {
								deptname : $("#searchName").val()
							}
						});
					});
					$(".addNews_btn").click(function() {
						addData();
					});
					$(".order_btn").click(function() {
						var index = layer.open({
							title : "调整顺序",
							type : 2,
							maxmin : true,
							content : prefix + "/deptTreeDrap",
							area : [ "600px", "400px" ]
						});
						layer.full(index);
					});
					function treereload() {
						treeGrid.reload("deptListTable", {
						/*
						 * page : { curr : 1 }
						 */
						});
					}
					$(".delAll_btn")
							.click(
									function() {
										var checkStatus = treeGrid
												.checkStatus('deptListTable'), data = checkStatus.data, ArrayData = [];
										if (data.length > 0) {
											for ( var i in data) {
												ArrayData.push(data[i].deptId);
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
					function addData() {
						var index = layer.open({
							title : "添加",
							type : 2,
							maxmin : true,
							content : prefix + "/add",
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
					function del(id) {
						layer.confirm('确定删除此记录？', {
							icon : 3,
							title : '提示信息'
						}, function(index) {
							$.post(prefix + "/remove", {
								deptId : id
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
							arr.push(data.deptId);
							if (data.children && data.children.length > 0) {
								for (var i = 0; i < data.children.length; i++) {
									arr = arr.concat(getData(data.children[i]));
								}
							}
						}
						return arr;
					}
					;
					treeGrid.on('tool(deptList)', function(obj) {
						var layEvent = obj.event, data = obj.data;
						switch (layEvent) {
						case "edit":
							editData(data.deptId);
							break;
						case "del":
							if (data.children.length == 0)
								del(data.deptId);
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
				});
