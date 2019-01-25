var prefix = "/system/reportStatistics"
$(function() {
	$("#dw-select").chosen({
		maxHeight : 200
	});
	// 点击事件
	$('#dw-select').on('change', function(e, params) {
		$("#tempfoid").val(params.selected);
		reLoad();
	});
	laydateon();
	selectLoad();
});
function loaddepts(rdcId) {
	$("#tempfoid").val(rdcId);
	$('#exampleTable').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : "/system/kbDept/list", // 服务器数据的加载地址
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
		// search : true, // 是否显示搜索框
		showColumns : false, // 是否显示内容下拉框（选择显示的列）
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
		// "server"
		queryParams : function(params) {
			return {
				// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
				limit : params.limit,
				offset : params.offset,
				foid : $("#tempfoid").val()
			};
		},
		// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
		// queryParamsType = 'limit' ,返回参数必须包含
		// limit, offset, search, sort, order 否则, 需要包含:
		// pageSize, pageNumber, searchText, sortName,
		// sortOrder.
		// 返回false将会终止请求
		columns : [
		// {
		// checkbox : true
		// },
		{
			field : 'oid',
			title : 'oid',
			visible : false
		}, {
			field : 'foid',
			title : '外键',
			visible : false
		}, {
			field : 'deptId',
			title : '单位编号',
			visible : false
		}, {
			field : 'deptGroupId',
			title : '分组编号',
			visible : false
		}, {
			field : 'ext1',
			title : '单位名称',
			align : 'center'
		}, {
			field : 'ext3',
			title : '单位分类',
			align : 'center'
		}, {
			field : 'ext2',
			title : '分组名称',
			align : 'center'
		}, {
			field : 'norder',
			title : '顺序',
			align : 'center'
		}, {
			field : 'ntype',
			title : '类型',
			align : 'center',
			formatter : function(value, row, index) { // 单元格格式化函数
				// 0集团本部，1股份公司
				var text = '-';
				if (value == 0) {
					text = "集团本部";
				} else if (value == 1) {
					text = "股份公司";
				}
				return text;
			}
		} ]
	});
}

function reLoad() {
	var path = "/system/kbDept/list";
	$('#exampleTable').bootstrapTable('refresh', {
		url : path
	});
}

function selectLoad() {
	var html = "";
	$.ajax({
		url : '/system/reportDeptCategory/grouplist',
		data : {
			sort : 'rdc_id',
			order : 'desc',
			limit : 20,
			offset : 0,
			code : $('#dcode').val()
		},
		cache : false,
		success : function(data) {
			// 没有数据，加载自定义的单位列表
			if (data.length < 1) {
				$("#dw-select").empty();
				$("#dw-select").append(html);
				$("#dw-select").trigger("chosen:updated");
				return;
			}
			$("#dw-select").empty();
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				if (i == 0) {
					html += '<option value="' + data[i].rdcId + '" selected >'
							+ data[i].name + '</option>';
				} else {
					html += '<option value="' + data[i].rdcId + '">'
							+ data[i].name + '</option>';
				}
			}

			$("#dw-select").append(html);
			$("#dw-select").trigger("chosen:updated");
			loaddepts($('#dw-select').val());
		}
	});
}
function showReport() {

	// 获取部门和时间
	var rdepart = new String();
	var rdcId = $('#dw-select').val();
	if (rdcId == -1) {
		layer.msg("请先到配置界面添加单位配置！");
		return;
	}

	var rdate = $('#renderdate').val();
	if (rdate == "") {
		layer.msg("请选择要统计的年月！");
		return;
	} else
		rdate = $('#renderdate').val() + '-01';

	var curcode = $("#dcode").val();
	// 打开统计报表
	url = urlrunqian + 'raq=' + curcode + '.raq&rdate=' + rdate + '&rfoid='
			+ rdcId;
	console.log(url);
	var index = layer.open({
		type : 2,
		title : "统计报表",
		shadeClose : false, // 点击遮罩关闭层
		area : [ '1000px', '620px' ],
		fixed : false,
		maxmin : true,
		content : url
	});
	layer.full(index);
}

function laydateon() {
	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format : 'yyyy-MM'
	});
};

function saveReport() {
	var rdcId = $('#dw-select').val();
	if (rdcId == -1) {
		layer.msg("请先到配置界面添加单位配置！");
		return;
	}
	var rdate = $("#renderdate").val();
	if (rdate == null || rdate == "") {
		layer.msg("请选择要统计的年月！");
		return;
	}
	rdate = rdate + "-01";
	var curcode = $("#dcode").val();
	layer.open({
		type : 2,
		title : '保存统计报表',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : '/system/labourreportstaticmain/add?ctype=2&rdate=' + rdate
				+ '&rdepart=' + rdcId + '&code=' + curcode// iframe的url
	});
}