var prefix = "/sys/menu";
layui.use([ 'form', 'layer' ], function() {
	var form = layui.form;
	var layer = layui.layer, $ = layui.jquery;
	form.on("submit(savemenu)", function(data) {
		// 弹出loading
		var index = top.layer.msg('数据提交中，请稍候', {
			icon : 16,
			time : false,
			shade : 0.8
		});
		// 实际使用时的提交信息
		$.post(prefix + "/update", $("#menuform").serialize(), function(res) {
			top.layer.close(index);
			top.layer.msg(res.msg);
			if (res.code == 0) {
				layer.closeAll("iframe");
				// 刷新父页面
				parent.location.reload();
			}
		});
		return false;
	});
	form.val('menuform', {
		"menutype" : $("#mtype").val()
	});
	$("#menuicon").click(function() {
		var index = layer.open({
			title : "选择图标",
			type : 2,
			maxmin : true,
			content : prefix + "/icon/",
			area : [ "550px", "400px" ]
		});
	});
	$("#btnOtherIcon").click(function() {
		var index = layer.open({
			title : "选择图标",
			type : 2,
			maxmin : true,
			content : "/FontIcoList.html",
			area : [ "550px", "400px" ]
		});
	});
});
function setIcon(iconname) {
	$("#menuicon").val(iconname);
}