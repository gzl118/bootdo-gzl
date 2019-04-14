var prefix = "/sys/role";
layui.use([ 'form', 'layer', 'laydate' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	layer = parent.layer === undefined ? layui.layer : top.layer,
			$ = layui.jquery;
	form.on("submit(saverole)", function(data) {
		// 弹出loading
		var index = top.layer.msg('数据提交中，请稍候', {
			icon : 16,
			time : false,
			shade : 0.8
		});
		// 实际使用时的提交信息
		$.post(prefix + "/update", $("#roleform").serialize(), function(res) {
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
	// 自定义验证规则
	form.verify({
		rolename : function(value, item) { // value：表单的值、item：表单的DOM对象
			if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
				return '用户名不能有特殊字符';
			}
		}
	});
	var setting = {
		check : {
			enable : true
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "menuId",
				pIdKey : "parentId",
				rootPId : "0"
			},
			key : {
				name : "menuname"
			}
		}
	};
	var zhouliMenu = {
		// 加载菜单
		loadMenu : function() {
			$.get("/sys/menu/list", {
				sort : 'ordernum',
				deleteflag : 1,
				page : 1,
				limit : -1
			}, function(data) {
				if (data && data.code == 0) {
					// 绑定zTree
					$.fn.zTree.init($("#treeMenu"), setting, data.rows);
					// 展开所有节点
					$.fn.zTree.getZTreeObj("treeMenu").expandAll(true);
				}
			});
		},
		getZtreeObj : function() {
			return $.fn.zTree.getZTreeObj("treeMenu");
		}
	};
	zhouliMenu.loadMenu();
});
