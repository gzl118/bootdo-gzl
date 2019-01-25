var prefix = "/system/reportStatistics"
$(function() {
	selectLoad();
	load();
});

function load() {
	
}
function reLoad() {
	rdate=$('#renderdate').val()+ '-01';
	rdcId=$('#dw-select').val();
	url='http://localhost:7878/jsDemo/reportJsp/showReport.jsp?raq=11002.raq&rdate='+rdate+'&rdcId='+rdcId;
	$('#reportContent').attr('src',url);
}
function selectLoad() {
	var html = "";
	$.ajax({
//		url : prefix+'/common/dict/type',
		url : '/system/reportDeptCategory/grouplist',
		data : {
			limit: 20,
			offset:0
		},
		success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				if(i==0){
					html += '<option value="' + data[i].rdcId + '" selected >' + data[i].name + '</option>';
				}
				else{
					html += '<option value="' + data[i].rdcId + '">' + data[i].name + '</option>';
				}
			}
			$(".chosen-select").append(html);
			$(".chosen-select").chosen({
				maxHeight : 200
			});
			//点击事件
			$('.chosen-select').on('change', function(e, params) {
				console.log(params.selected);
			});
		}
	});
}

