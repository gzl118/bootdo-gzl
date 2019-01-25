$().ready(function() {
	validateRule();
	$("#deptGroupId").chosen({
		maxHeight : 200
	});
	selectLoad();
	ctldis();
	initSel();
});
function ctldis() {
	var code = $("#code").val();
	if (code == '20006') {
		$("#ntype")
				.html(
						'<option value="0">矿合计</option><option value="1">选煤厂合计</option>');
	}
}
function initSel() {
	var nt = $("#hiddentype").val();
	$("#ntype").val(nt);
}
$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/kbDept/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			cname : {
				required : true
			}
		},
		messages : {
			cname : {
				required : icon + "请输入名称"
			}
		}
	})
}
function selectLoad() {
	var html = "";
	var selId = $("#deptGroupIdsel").val();
	$.ajax({
		url : '/system/kbGroup/grouplist',
		data : {
			limit : 1000,
			offset : 0
		},
		cache : false,
		success : function(data) {
			// 没有数据，加载自定义的单位列表
			if (data.length < 1) {
				html += '<option value="0" selected >无</option>';
				$("#deptGroupId").append(html);
				$("#deptGroupId").trigger("chosen:updated");
				return;
			}
			html += '<option value="0" selected >无</option>';
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				if (data[i].oid == selId) {
					html += '<option value="' + data[i].oid + '" selected >'
							+ data[i].cname + '</option>';
				} else {
					html += '<option value="' + data[i].oid + '">'
							+ data[i].cname + '</option>';
				}
			}

			$("#deptGroupId").append(html);
			$("#deptGroupId").trigger("chosen:updated");
		}
	});
}
var openDept = function() {
	layer.open({
		type : 2,
		title : "选择部门",
		area : [ '300px', '450px' ],
		content : "/system/sysDept/treeView"
	})
}
function loadDept(deptId, deptName) {
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
}