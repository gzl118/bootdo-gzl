var prefix = "/system/dept";
layui.use([ 'form', 'layer' ], function() {
	var form = layui.form;
	var layer = layui.layer, $ = layui.jquery;
	form.on("submit(savedept)", function(data) {
		// 弹出loading
		var index = top.layer.msg('数据提交中，请稍候', {
			icon : 16,
			time : false,
			shade : 0.8
		});
		// 实际使用时的提交信息
		$.post(prefix + "/update", $("#deptform").serialize(), function(res) {
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
	var openDept = function() {
		var index = layer.open({
			type : 2,
			title : "选择部门",
			area : [ '300px', '450px' ],
			content : "/system/dept/deptTree?parentId=" + $("#deptId").val()
		});
	}
	$("#pdeptname").click(function() {
		openDept();
	});
});
function loadDept(deptId, deptName) {
	$("#parentId").val(deptId);
	$("#pdeptname").val(deptName);
}
