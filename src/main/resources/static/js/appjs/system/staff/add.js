var prefix = "/system/staff";
require.config({
	paths : {}
});
require(
		[ "jquery", 'layui' ],
		function($) {
			layui
					.use(
							[ 'form', 'layer', 'laydate' ],
							function() {
								var form = layui.form;
								var laydate = layui.laydate;
										layer = parent.layer === undefined ? layui.layer
												: top.layer, $ = layui.jquery;
								laydate.render({
									elem : '#birthday'
								});
								form.on("submit(savestaff)", function(data) {
									// 弹出loading
									var index = top.layer.msg('数据提交中，请稍候', {
										icon : 16,
										time : false,
										shade : 0.8
									});
									// 实际使用时的提交信息
									$.post(prefix + "/save", $("#staffform")
											.serialize(), function(res) {
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
								form
										.on(
												'switch(estatus)',
												function(data) {
													var t = (data.elem.checked === true ? 0
															: 1);
													$("#estatus").val(t);
												});
								// 自定义验证规则
								form
										.verify({
											employeename : function(value, item) { // value：表单的值、item：表单的DOM对象
												if (!new RegExp(
														"^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$")
														.test(value)) {
													return '姓名不能有特殊字符';
												}
											},
											selfemail : function(value, item) {
												if (value != null
														&& value != '')
													if (!new RegExp(
															"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")
															.test(value)) {
														return '邮箱格式不正确';
													}
											},
											selfnumber : function(value, item) {
												if (value != null
														&& value != '')
													if (isNaN(value))
														return "只能填写数字"
											},
											selfphone : function(value, item) {
												if (value != null
														&& value != '')
													var re = /^1\d{10}$/;
												if (!re.test(value)) {
													return '请输入正确的手机号';
												}
											}
										});
							});
		});