$("#btnDone").hide();
	var taskList = [];
	getTaskList(false);

	function getTaskList(isSearch){
		if(!isSearch){
			var _taskList = localStorage.getItem("MyTaskList");
			if(_taskList != null || taskList != ""){
				taskList = JSON.parse(_taskList);
			}
		}

		$("#listNames").empty();
		for(var i=0; i<taskList.length; i++){
			var html = "<li data-index='"+taskList[i]["index"]+"'>" + 
				"<span>"+
				((taskList[i]["isDone"]) ? "<label class='label label-success'>Done</label>" : "<label class='label label-warning'>Pending</label>")+
				"<a href='javascript:;' onclick='modifyTask("+taskList[i]["index"]+")'>Modify</a>"+
				"<a href='javascript:;' onclick='removeTask("+taskList[i]["index"]+")'>Remove</a>"+
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
		getTaskList(false);
	}

	function modifyTask(index){
		var item = taskList[index];
		$("#txtName").val(item["name"]);
		$("#txtCategory").val(item["category"]);
		$("#btnDone").attr("data-index", index);
		$("#btnDone").show();
		$("#btnAdd").hide();
	}

	function removeTask(index){
		var item = taskList[index];
		taskList.splice(item,1);
		localStorage.setItem("MyTaskList", JSON.stringify(taskList));
		getTaskList(false);
	}


	function searchTasklist(term){
		var arr = $.grep(taskList, function(item){
			return item["name"].indexOf(term) > -1 || item["category"].indexOf(term) > -1;
		});
		
		taskList = arr;	
		getTaskList(true);
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
		  
		  getTaskList(false);
		});
		
		$("#btnDone").click(function() {
			var index = $(this).attr("data-index");
			var item = taskList[index];
			item["name"] = $("#txtName").val();
			item["category"] = $("#txtCategory").val();
			taskList[index] = item;
			
			localStorage.setItem("MyTaskList", JSON.stringify(taskList));		
			getTaskList(false);
			
			$("#btnDone").hide();
			$("#btnAdd").show();
			
			$("#txtName").val("");
			$("#txtCategory").val("");
		});
	

	
		$("#listNames").sortable({
			cursor: "move",
			revert: true,
			start: function(event, ui) {
				var currentIndex = ui.item.index();
				ui.item.data('currentIndex', currentIndex);
			},
			update: function(event, ui){
				var currentIndex = ui.item.data('currentIndex');
				var newIndex = ui.item.index();

				var element = taskList[currentIndex];
				taskList.splice(currentIndex, 1);
				taskList.splice(newIndex, 0, element);

				for(var i=0; i<taskList.length; i++){
					taskList[i]["index"] = i;
				}

				localStorage.setItem("MyTaskList", JSON.stringify(taskList));
				getTaskList(false);
			}
		});
		$("#listNames").disableSelection();
		
		
		$("#txtSearch").change(function(){
			searchTasklist($(this).val());
		})

	 
		$(document).on("click", "#listNames li" , function(e) {
			if(e.target.tagName == 'A'){
				return;
			}

			var index = $(this).attr("data-index");
			toggleStatus(index);
		});
	  
	});