// 以下为官方示例
$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$("#roleIds").val(getCheckedRoles());
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sys/user/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg(data.msg);
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.msg(data.msg);
			}

		}
	});

}
function getCheckedRoles() {
	var adIds = "";
	$("input:checkbox[name=role]:checked").each(function(i) {
		if (0 == i) {
			adIds = $(this).val();
		} else {
			adIds += ("," + $(this).val());
		}
	});
	return adIds;
}
function setCheckedRoles() {
	var roleIds = $("#roleIds").val();
	alert(roleIds);
	var adIds = "";
	$("input:checkbox[name=role]:checked").each(function(i) {
		if (0 == i) {
			adIds = $(this).val();
		} else {
			adIds += ("," + $(this).val());
		}
	});
	return adIds;
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
		username : {
			required : true,
			minlength : 2,
			remote : {
				url : "/sys/user/exit2", // 后台处理程序
				type : "post", // 数据发送方式
				dataType : "json", // 接受数据格式
				data : { // 要传递的数据
					username : function() {
						return $("#username").val();
					},
					userId : function() {
						return $("#userId").val();
					}
	
				}
			}
		},
		deptName : {
			required : true,
			deptName : true
		}
	},
	messages : {
		username : {
			required : icon + "请输入您的用户名",
			minlength : icon + "用户名必须两个字符以上",
			remote : icon + "用户名已经存在"
		},
		deptName : {
			required : icon + "请选择所属机构"
		}
	}
	})
}
var openStaff = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '700px', '420px' ],
		content:"/system/staff/selectView"
	})
}
function loadStaffAndDept(staffId,name,deptId,deptName){
	$("#staffId").val(staffId);
	$("#name").val(name);
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
	$("#deptName").attr("disabled","true");
}
var openDept = function(){
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '300px', '450px' ],
		content:"/system/sysDept/treeView"
	})
}
function loadDept( deptId,deptName){
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
}