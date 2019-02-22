var prefix = "/system/staff";
layui
		.use(
				[ 'form', 'layer', 'laydate', 'upload' ],
				function() {
					var form = layui.form, upload = layui.upload;
					var laydate = layui.laydate;
					layer = layui.layer, $ = layui.jquery;
					laydate.render({
						elem : '#birthday'
					});
					var uploadInst = upload.render({
						elem : '#btnphoto',
						url : prefix + '/upload/',
						before : function(obj) {
							// 预读本地文件示例，不支持ie8
							/*
							 * obj.preview(function(index, file, result) {
							 * $('#demo').attr('src', result); // 图片链接（base64）
							 * });
							 */
						},
						done : function(res) {
							// 如果上传失败
							if (res.code == 0) {
								$("#photo").val(res.msg);
								$('#personPhoto').attr('src', res.msg);
								return;
							}
							return layer.msg('上传失败');
							// 上传成功
						},
						error : function() {
							layer.msg('上传失败');
						}
					});
					form.on("submit(savestaff)", function(data) {
						// 弹出loading
						var index = top.layer.msg('数据提交中，请稍候', {
							icon : 16,
							time : false,
							shade : 0.8
						});
						// var a = $("#staffform").serialize();
						// 实际使用时的提交信息
						$.post(prefix + "/update", $("#staffform").serialize(),
								function(res) {
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
					form.on('switch(cbxestatus)', function(data) {
						var t = (data.elem.checked === true ? 0 : 1);
						$("#estatus").val(t);
					});
					form.val('staffform', {
						"cbxestatus" : $("#estatus").val() == 0 ? true : false,
						"sex" : $("#sex").val()
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
									if (value != null && value != '')
										if (!new RegExp(
												"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")
												.test(value)) {
											return '邮箱格式不正确';
										}
								},
								selfnumber : function(value, item) {
									if (value != null && value != '')
										if (isNaN(value))
											return "只能填写数字"
								},
								selfphone : function(value, item) {
									if (value != null && value != '') {
										var re = /^1\d{10}$/;
										if (!re.test(value)) {
											return '请输入正确的手机号';
										}
									}
								}
							});
					var openDept = function() {
						var index = layer.open({
							type : 2,
							title : "选择部门",
							area : [ '300px', '450px' ],
							content : "/system/dept/deptTree"
						});
					}
					$("#deptName").click(function() {
						openDept();
					});
				});
function loadDept(deptId, deptName) {
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
}