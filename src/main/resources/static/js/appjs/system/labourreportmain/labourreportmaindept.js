var prefix = "/system/labourreportmain"
$(function() {
	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format : 'yyyy-MM'
	});
	$("#nstatus").chosen({
		maxHeight : 200
	});
	// load();
});

function load() {
	var rdate = $('#renderdate').val();
	if (rdate == "") {
		layer.msg("请选择要查询的年月！");
		return;
	} else
		rdate = $('#renderdate').val() + '-01';
	var param = $("#nstatus").val();
	var nstatus = new Array();
	if (param != null) {
		nstatus = param;
	}
	$.ajax({
		cache : false,
		type : "GET",
		url : prefix + "/listdept",
		data : {
			code : $("#code").val(),
			renderdate : rdate,
			renderdepart : $("#renderdepart").val(),
			status : nstatus
		},
		// async : false,
		error : function(request) {
			parent.layer.alert("发生错误");
		},
		success : function(data) {
			if (data)
				drawhtml(data);
		}
	});
}
function drawhtml(ndata) {
	$("#divDept").empty();
	if (!ndata)
		return;
	if (ndata.length == 0)
		return;
	var colcount = 6;
	var rcount = Math.ceil(ndata.length / colcount);
	var nhtml = "";
	var temp = "";
	var statusclass = "";
	var statusname = "";
	for (var i = 0; i < rcount; i++) {
		nhtml += '<div style="width:100vw;">'; // class="row"
		for (var j = 0; j < colcount; j++) {
			var nindex = i * colcount + j;
			if (nindex < ndata.length) {
				temp = ndata[nindex].name;
				statusclass = getdivclass(ndata[nindex].orderNum);
				statusname = getstatus(ndata[nindex].orderNum);

				nhtml += '<div style="border:1px solid #e5e6e7;padding: 5px;margin:1px;width:16vw;float:left;"><p style="font-size:14px;" >'
						+ temp
						+ '<span style="font-size:12px;float:right;" class="label '
						+ statusclass + '">' + statusname + '</span></p></div>';
			} else {
				temp = "";
				statusclass = "";
				statusname = "";
			}
		}
		nhtml += '</div>';
	}
	$("#divDept").append(nhtml);
}

function getdivclass(ntype) {
	var result = "label-warning"; // btn-warning
	switch (ntype) {
	case 0: // 未提交
		result = "label-info";
		break;
	case 1: // 已提交
		result = "label-success";
		break;
	case 2: // 审核通过
		result = "label-primary";
		break;
	case 3: // 审核未通过
		result = "label-danger";
		break;
	}
	return result;
}
function getstatus(ntype) {
	var result = "未填写"; // btn-warning
	switch (ntype) {
	case 0: // 未提交
		result = "未提交";
		break;
	case 1: // 已提交
		result = "已提交";
		break;
	case 2: // 审核通过
		result = "审核通过";
		break;
	case 3: // 审核未通过
		result = "审核未通过";
		break;
	}
	return result;
}