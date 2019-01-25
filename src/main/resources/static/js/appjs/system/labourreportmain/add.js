$().ready(function() {
	validateRule();

	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format:'yyyy-MM'
	});
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/labourreportmain/save",
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
			renderdepart : {
				required : true
			},
			renderdate : {
				required : true
			}
		},
		messages : {
			renderdepart : {
				required : icon + "请输入单位名称"
			},
			renderdate : {
				required : icon + "请输入汇报年月"
			}
		}
	})
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
	$("#ext1").val(deptId);
	$("#renderdepart").val(deptName);
}