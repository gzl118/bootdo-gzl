var prefix = "/system/reportStatistics"
$(function() {
	laydateon();
	selectLoad();
});

function load(rdcId) {
	$('#exampleTable')
	.bootstrapTreeTable(
		{
			id : 'deptId',
			code : 'deptId',
            parentCode : 'parentId',
            params:'85',
			type : "GET", // 请求数据的ajax类型
			url : '/system/reportDept/list', // 请求数据的ajax的url
			ajaxParams : {
				rdcId : rdcId,
				limit : 2000,
				offset : 0
						}, // 请求数据的ajax的data属性
			expandColumn : '1', // 在哪一列上面显示展开按钮
			striped : true, // 是否各行渐变色
			bordered : true, // 是否显示边框
			expandAll : true, // 是否全部展开								
			columns : [
				{
					title : '编号',
					field : '',
					visible : false,
					align : 'center',
					valign : 'center',
					width : '50px',
				},
				{
					field : 'sname',
					title : '单位简称',
                    valign : 'center',
					witth :20
				},
				{
					field : 'orderNum',
					title : '排序',
                    align : 'center',
                    valign : 'center'
				} ]
		});
}
//function reLoad() {
//	load();
//}
function selectLoad() {
	var html = "";
	$.ajax({
		url : '/system/reportDeptCategory/grouplist',
		data : {
			limit: 20,
			offset:0,
			code: 20001
		},
		success : function(data) {
			//没有数据，不加载
			 if(data.length<1) return;
			//加载数据
			for (var i = 0; i < data.length; i++) {
//				console.log(data[i].rdcId);
				if(i==0){
					html += '<option value="' + data[i].rdcId + '" selected >' + data[i].name + '</option>';
				}
				else{
					html += '<option value="' + data[i].rdcId + '">' + data[i].name + '</option>';
				}
			};
			$(".chosen-select").append(html);
			$(".chosen-select").chosen({
				maxHeight : 200
			});
			//点击事件
			$('.chosen-select').on('change', function(e, params) {
				console.log(params.selected);
				load(params.selected);
			});
//			console.log($('#dw-select').val());
			load($('#dw-select').val());
		}
	});
}
function showReport() {
	
	rdate=$('#renderdate').val();
	if(rdate=="") 
	{
		var d=new Date();
		d.setDate(1);
		rdate=formatdate(d);
	}
	else rdate=$('#renderdate').val()+ '-01';	
	
	rdcId=$('#dw-select').val();
	url='http://localhost:7878/jsDemo/reportJsp/showReport.jsp?raq=20001.raq&rdate='+rdate+'&rdcId='+rdcId;
	
	var index = layer.open({
		type : 2,
		title : "统计报表明显",
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
//		area : [ '800px', '520px' ],
		area : [ '1000px', '620px' ],
		content : url
	});
	layer.full(index);
}
function formatdate(date){
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}; 
function laydateon(){
	laydate.render({
		elem : '#renderdate',
		type : 'month',
		trigger : 'click',
		format:'yyyy-MM'
	});
};

