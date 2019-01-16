$("#btnDone").hide();
	var taskList = [];
	getTaskList();

	function getTaskList(){
		var _taskList = localStorage.getItem("MyTaskList");
		if(_taskList != null || taskList != ""){
			taskList = JSON.parse(_taskList);
		}

		$("#listNames").empty();
		for(var i=0; i<taskList.length; i++){
			var html = "<li data-index='"+taskList[i]["index"]+"'>" + 
				"<span>"+
				((taskList[i]["isDone"]) ? "<label class='label label-success'>Done</label>" : "<label class='label label-warning'>Pending</label>")+
				"<a href='javascript:;' onclick='modifyTask("+taskList[i]["index"]+")'>Modify</a>"+
				"<a href='javascript:;'>Remove</a>"+
				"</span>"+
				"<h4>" + taskList[i]["name"] + "</h4> <div class='text-muted'>" + taskList[i]["category"] + "</div>" + 
				"</li>";
			$("#listNames").append(html);
		}
	}

	function toggleStatus(index){
		var item = taskList[index];
		item["isDone"] = !item["isDone"];		
		taskList[index] = item;
		
		localStorage.setItem("MyTaskList", JSON.stringify(taskList));		
		getTaskList();
	}

	function modifyTask(index){
		var item = taskList[index];
		$("#txtName").val(item["name"]);
		$("#txtCategory").val(item["category"]);
		$("#btnDone").attr("data-index", index);
		$("#btnDone").show();
		$("#btnAdd").hide();
	}


	$(document).ready(function(){		
		$("#btnAdd").click(function(){
		  var obj = {
			index: taskList.length,
			name: $("#txtName").val(),
			category: $("#txtCategory").val(),
			isDone: false
		  };
		  taskList.push(obj);
		  localStorage.setItem("MyTaskList", JSON.stringify(taskList));
		  
		  $("#txtName").val("");
		  $("#txtCategory").val("");
		  
		  getTaskList();
		});
		
		$("#btnDone").click(function() {
			var index = $(this).attr("data-index");
			var item = taskList[index];
			item["name"] = $("#txtName").val();
			item["category"] = $("#txtCategory").val();
			taskList[index] = item;
			
			localStorage.setItem("MyTaskList", JSON.stringify(taskList));		
			getTaskList();
			
			$("#btnDone").hide();
			$("#btnAdd").show();
			
			$("#txtName").val("");
			$("#txtCategory").val("");
		});
	})