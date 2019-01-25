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
function saveReportConfig1() {
	var configfoid = $("#foid").val();
	var items = $('input[name="l1"]:checked');
	var arritems = new Array();
	$(items).each(function(i) {
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
		confnew.colorder = (i + 1);
		arritems.push(confnew);
	});
	var jsonresult = JSON.stringify(arritems);
	console.log(jsonresult);
	$.ajax({
		url : durl,
		data : {
			sjson : jsonresult
		},
		type : "post",
		dataType : 'json',
		success : function(data) {
			if (data && data.message) {
				var msg = data.message == "1" ? "保存成功！"
						: (data.message == "2" ? "没有要保存的数据！" : "保存失败！")
				parent.layer.alert(msg);
			}
			else
				parent.layer.alert("发生错误！");
		}.bind(this),
		error : function(xhr, status, err) {
		}.bind(this)
	});
}
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