var prefix = "/system/labourreportstaticmain"
$(function() {
	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format : 'yyyy-MM'
	});
	var iframe = document.getElementById("batchexportframe");
	if (iframe.attachEvent) {
		iframe.attachEvent("onload", function() {
			layer.msg("导出完毕");
		});
	} else {
		iframe.onload = function() {
			layer.msg("导出完毕");
		};
	}
	load();
});

function load() {
	$('#exampleTable').bootstrapTable(
			{
				method : 'get', // 服务器数据的请求方式 get or post
				url : prefix + "/listexport", // 服务器数据的加载地址
				// showRefresh : true,
				// showToggle : true,
				// showColumns : true,
				iconSize : 'outline',
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				// contentType : "application/x-www-form-urlencoded",
				// //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
				pageList : [ 10, 20, 50, 100, 'All' ],
				// search : true, // 是否显示搜索框
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
				clickToSelect : true,
				queryParams : function(params) {
					return {
						// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
						limit : params.limit,
						offset : params.offset,
						renderdate : ($('#renderdate').val() == null || $(
								'#renderdate').val() == '') ? $('#renderdate')
								.val() : $('#renderdate').val() + '-01',
						ctype : $("#ctype").val()
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
							checkbox : true
						},
						{
							field : 'oid',
							title : '主键',
							visible : false
						},
						{
							field : 'code',
							title : '编号',
							align : 'center',
							width : '180px',
							visible : true
						},
						{
							field : 'renderdate',
							title : '统计年月',
							align : 'center',
							width : '180px',
							formatter : function(value, row, index) {
								var val = value;
								if (val != null) {
									var date = new Date(val);
									return date.getFullYear() + '年'
											+ (date.getMonth() + 1) + '月';
								}
							}
						}, {
							field : 'ext1',
							align : 'center',
							title : '统计单位/配置文件名称'
						}, {
							field : 'ctype',
							title : '分类，1表示统计报表，2表示快报,3表示自定义',
							visible : false
						}, {
							field : 'deptids',
							title : '统计的单位编号,多个以逗号隔开',
							visible : false
						}, {
							field : 'status',
							title : '状态',
							align : 'center',
							width : '80px',
							visible : false,
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

						}, {
							field : 'remark',
							title : '说明',
							align : 'center',
							width : '250px'
						}, {
							field : 'renderdepart',
							title : '填报单位',
							visible : false
						}, {
							field : 'mineleader',
							title : '矿负责人',
							visible : false
						}, {
							field : 'businessleader',
							title : '业务部门负责人',
							visible : false
						}, {
							field : 'edituser',
							title : '制表人',
							visible : false
						}, {
							field : 'edittime',
							title : '制表时间',
							visible : false
						}, {
							field : 'upttime',
							title : '更新时间',
							visible : false
						}, {
							field : 'uptuser',
							title : '操作人',
							visible : false
						}, {
							field : 'ext2',
							title : '备用2',
							visible : false
						}, {
							field : 'ext3',
							title : '备用3',
							visible : false
						} ]
			});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function batchExport() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要至少一条数据");
		return;
	}
	var arritems = new Array();
	$.each(rows, function(i, row) {
		var confnew = {};
		$.extend(confnew, exitem);
		confnew.raq = row.code;
		confnew.rdate = row.renderdate;
		confnew.rfoid = row.deptids;
		confnew.roid = row.oid;
		confnew.rdepart = row.deptids;
		if (row.code.indexOf("4") == 0) {
			confnew.roid = row.remark; // 存放标题
			confnew.rfoid = row.ext2;
		}
		arritems.push(confnew);
		if (row.code == '30005') {
			var confnew1 = {};
			$.extend(confnew1, exitem);
			confnew1.raq = '30015';
			confnew1.rdate = row.renderdate;
			confnew1.rfoid = row.deptids;
			confnew1.roid = row.oid;
			confnew1.rdepart = row.deptids;
			arritems.push(confnew1);
		}
	});
	var jsonresult = JSON.stringify(arritems);
	report1_bathexport(jsonresult);
	// alert(jsonresult);
}
function report1_bathexport(param) {
	var url = urlrunqianexportserver + "report=" + param;
	document.getElementById("batchexportframe").src = url;
}
var exitem = {
	raq : null,
	rdate : null,
	rfoid : null,
	roid : null,
	rdepart : null
};