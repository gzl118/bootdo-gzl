var prefix = "/common/generator";
layui
		.use(
				[ 'form', 'layer', 'table', 'laytpl' ],
				function() {
					var form = layui.form, layer = layui.layer, $ = layui.jquery, laytpl = layui.laytpl, table = layui.table;
					$.get("/common/generator/list", function(res) {
						// 用户列表
						var tableIns = table.render({
							elem : '#codeList',
							data : res,
							cellMinWidth : 95,
							page : true,
							even : true,
							height : "full-100",
							limits : [ 5, 10, 15, 20, 25 ],
							limit : 10,
							id : "codeListTable",
							done : function(res, curr, count) {
							},
							cols : [ [ {
								type : "checkbox",
								fixed : "left",
								width : 50
							}, {
								field : 'tableName',
								title : '表名称',
								minWidth : 100,
								align : "center"
							}, {
								field : 'engine',
								title : 'engine',
								align : 'center',
								minWidth : 50
							}, {
								field : 'tableComment',
								title : '表描述',
								align : 'center',
								minWidth : 100
							}, {
								field : 'createTime',
								title : '创建时间',
								align : 'center',
								minWidth : 100
							}, {
								title : '操作',
								width : 220,
								templet : '#codeListBar',
								fixed : "right",
								align : "center"
							} ] ]
						});
					});
					$(".codegenerator").on("click", function() {
						batchCode();
					});
					$(".generatormethod").click(function() {
						edit();
					});
					table.on('tool(codeList)', function(obj) {
						var layEvent = obj.event, data = obj.data;
						switch (layEvent) {
						case "generate":
							code(data.tableName);
							break;
						}
					});
					function code(tableName) {
						location.href = prefix + "/code/" + tableName;
					}
					function batchCode() {
						var checkStatus = table.checkStatus('codeListTable'), data = checkStatus.data, ArrayData = [];
						if (data.length == 0) {
							layer.msg("请选择要生成代码的表");
							return;
						}
						for ( var i in data) {
							ArrayData.push(data[i].tableName);
						}
						location.href = prefix + "/batchCode?tables="
								+ JSON.stringify(ArrayData);
					}

					function edit() {
						console.log('打开配置页面');
						layer.open({
							type : 2,
							title : '增加',
							maxmin : true,
							shadeClose : false,
							area : [ '800px', '520px' ],
							content : prefix + '/edit'
						});
					}
				});