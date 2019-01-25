var prefix = "/system/reportconfig";

var configitem = {
	oid : null,
	foid : null,
	tbname : null,
	rowoid : null,
	colfieldname : null,
	colname : null,
	colaliasname : null,
	colorder : null
};
var durl = "/system/reportAutoconfig/saveconfig";
function saveReportConfig() {
	var configfoid = $("#foid").val();
	var arritems = new Array();
	var items = $('input[name="l1"]:checked');
	var colindex = 0;
	$(items).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail1";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items2 = $('input[name="l2"]:checked');
	$(items2).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail2";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items3 = $('input[name="l3"]:checked');
	$(items3).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail3";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items32 = $('input[name="l32"]:checked');
	$(items32).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail32";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items4 = $('input[name="l4"]:checked');
	$(items4).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail4";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items5 = $('input[name="l5"]:checked');
	$(items5).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail5";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items52 = $('input[name="l52"]:checked');
	$(items52).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail52";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items6 = $('input[name="l6"]:checked');
	$(items6).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail6";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var items7 = $('input[name="l7"]:checked');
	$(items7).each(function(i) {
		colindex++;
		var colname = $(this).data("colname");
		var id = $(this).attr("id");
		var arr = id.split("_");
		var confnew = {};
		$.extend(confnew, configitem);
		confnew.foid = configfoid;
		confnew.tbname = "labourrepotdetail7";
		confnew.rowoid = arr[1];
		confnew.colfieldname = arr[2];
		confnew.colname = colname;
		confnew.colorder = colindex;
		arritems.push(confnew);
	});
	var jsonresult = JSON.stringify(arritems);
	$.ajax({
		url : durl,
		data : {
			sjson : jsonresult,
			foid : configfoid
		},
		type : "post",
		dataType : 'json',
		success : function(data) {
			if (data && data.message) {
				var msg = data.message == "1" ? "保存成功！" : "保存失败！";
				parent.layer.alert(msg);
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
			} else
				parent.layer.alert("发生错误！");
		}.bind(this),
		error : function(xhr, status, err) {
		}.bind(this)
	});
}
function resetAllReportConfig() {
	$('input[name="l1"]').removeAttr("checked");
	$('input[name="l2"]').removeAttr("checked");
	$('input[name="l3"]').removeAttr("checked");
	$('input[name="l32"]').removeAttr("checked");
	$('input[name="l4"]').removeAttr("checked");
	$('input[name="l5"]').removeAttr("checked");
	$('input[name="l52"]').removeAttr("checked");
	$('input[name="l6"]').removeAttr("checked");
	$('input[name="l7"]').removeAttr("checked");
}
var confurl = "/system/reportAutoconfig/listbyfk";
function getConfig() {
	var foid = $("#foid").val();
	$.ajax({
		url : confurl,
		data : {
			foid : foid
		},
		type : "get",
		dataType : 'json',
		success : function(data) {
			if (data && data.length > 0) {
				bindData(data);
			}
		}.bind(this),
		error : function(xhr, status, err) {
			console.log(confurl + " -->获取数据失败！");
		}.bind(this)
	});
}
function bindData(data) {
	$.each(data, function(i, item) {
		var ntype = item.tbname;
		var tid = '#' + ntype + 'cb_' + item.rowoid + "_" + item.colfieldname;
		$(tid).prop("checked", "checked");
		$(tid).data("colname", item.colname);
	});
}
function resetHeight() {
	var a = $("body").height();
	var b = $(".ibox-title").height();
	var c = $("#divBtn").height();
	var d = a - b - c - 22;
	console.log(a + ":" + c + ":" + b + ":" + d);
	$(".tab-content  iframe").height(d);
}
$(function() {
	resetHeight();
	getConfig();
	$("input[type='checkbox']").on("click", function() {
		var chb = $(this).prop("checked");
		if (chb == true) {
			var title = $(this).data("colname");
			var _self = this;
			layer.prompt({
				title : '请输入列标题(报表列名)',
				closeBtn : 0,
				btn : [ "确定" ],
				formType : 2,
				value : title
			}, function(val, index) {
				$(_self).data("colname", val);
				layer.close(index);
			});
		}
	});
});
function resetReportConfig1() {
	$('input[name="l1"]').removeAttr("checked");
}
function resetReportConfig2() {
	$('input[name="l2"]').removeAttr("checked");
}
function resetReportConfig3() {
	$('input[name="l3"]').removeAttr("checked");
}
function resetReportConfig32() {
	$('input[name="l32"]').removeAttr("checked");
}
function resetReportConfig4() {
	$('input[name="l4"]').removeAttr("checked");
}
function resetReportConfig5() {
	$('input[name="l5"]').removeAttr("checked");
}
function resetReportConfig52() {
	$('input[name="l52"]').removeAttr("checked");
}
function resetReportConfig6() {
	$('input[name="l6"]').removeAttr("checked");
}
function resetReportConfig7() {
	$('input[name="l7"]').removeAttr("checked");
}