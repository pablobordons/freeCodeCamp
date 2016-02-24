
	function moveUp(){
		$("#navigator").css("margin-top","0px");
		$("#reference").css("margin-top","0px");
		// $("#navigator").css("position","absolute");
		// $(".item").css("height","2000px");
	}

	// function moveDown(){
	// 	// $("#navigator").css("margin-top","25%");
	// 	$(".item").css("height","20px");
	// }

// create li

	function createUl(){

	 	moveUp();
		var num = 40;
		$(".item").append("<ul>");

		for(var i = 0; i<num; i++){
			$(".item").append("<li></li>");
		}

		$(".item").append("</ul>");


	}


$("#search-button").
