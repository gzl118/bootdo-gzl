var prefix = "/sys/user";
layui.use([ 'form', 'layer' ], function() {
	var form = layui.form;
	var layer = layui.layer, $ = layui.jquery;
	form.on("submit(addUser)", function(data) {
		$.post(prefix + "/isExist", {
			username : $("#username").val(),
			userId : $("#userId").val()
		}, function(res1) {
			if (res1.code == 0) {
				// 弹出loading
				var index = top.layer.msg('数据提交中，请稍候', {
					icon : 16,
					time : false,
					shade : 0.8
				});
				// 实际使用时的提交信息
				$.post(prefix + "/update", $("#userform").serialize(),
						function(res) {
							top.layer.close(index);
							top.layer.msg(res.msg);
							if (res.code == 0) {
								layer.closeAll("iframe");
								// 刷新父页面
								parent.location.reload();
							}
						});
			} else {
				top.layer.msg(res1.msg);
			}
		});
		return false;
	});
	form.on('switch(userstatus)', function(data) {
		var t = (data.elem.checked === true ? 1 : 0);
		$("#userstatus").val(t);
	});
	form.val('userform', {
		"cbxuserstatus" : $("#userstatus").val() == 1 ? true : false
	});
	// 自定义验证规则
	form.verify({
		username : function(value, item) { // value：表单的值、item：表单的DOM对象
			if (/[\u4e00-\u9fa5]+/.test(value)) {
				return '用户名不能为汉字';
			}
			if (/\s+/.test(value)) {
				return '用户名不能包含空格';
			}
			if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
				return '用户名不能有特殊字符';
			}
		}
	});
	var openEmployee = function() {
		var index = layer.open({
			type : 2,
			title : "选择员工",
			area : [ '400px', '450px' ],
			content : "/system/staff/staffTree"
		});
	}
	$("#employeename").click(function() {
		openEmployee();
	});
});
function loadEmployee(employeeId, employeename,deptId) {
	$("#employeeId").val(employeeId);
	$("#employeename").val(employeename);
	$("#deptId").val(deptId);
}