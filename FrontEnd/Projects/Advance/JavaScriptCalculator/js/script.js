$(".key-btn").mousedown(function(){
	
	btnDown(this);
})

$(".key-btn").mouseup(function(){
	btnUp(this);
})

$(".key-btn").mouseleave(function(){
	btnUp(this);
})


function btnDown(btn){
	$(btn).css("box-shadow","0px 0px 0px 0px #575757");
	$(btn).css("margin-top","2px");

}

function btnUp(btn){
	$(btn).css("box-shadow","0px 3px 0px #575757");
	$(btn).css("margin-top","0px");
}


////// buttons:

function checkLength(){

	var length = $(".screen").html().length;
	console.log(length)

	return     (length < 15)
			?  true
			:  false
}

// function cleanZeroes(){

// 	if()

// }

/// numbers

	$("#btn-zero").click(function(){
		if (checkLength()) {
			if($(".screen").html()[0] !== "0") $(".screen").append("0");
		}


	});

	$("#btn-one").click(function(){
		$(".screen").append("1");
	});

	$("#btn-two").click(function(){
		$(".screen").append("2");
	});

	$("#btn-three").click(function(){
		$(".screen").append("3");
	});

	$("#btn-four").click(function(){
		$(".screen").append("4");
	});

	$("#btn-five").click(function(){
		$(".screen").append("5");
	});

	$("#btn-six").click(function(){
		$(".screen").append("6");
	});

	$("#btn-seven").click(function(){
		$(".screen").append("7");
	});

	$("#btn-eight").click(function(){
		$(".screen").append("8");
	});

	$("#btn-nine").click(function(){
		$(".screen").append("9");
	});



/// operations

	$("#btn-dot").click(function(){

	});

	$("#btn-divided").click(function(){

	});

	$("#btn-times").click(function(){

	});

	$("#btn-plus").click(function(){

	});

	$("#btn-minus").click(function(){

	});

	$("#btn-equal").click(function(){

	});

/// others

	$("#btn-ac").click(function(){
		$(".screen").html("");
	});


	$("#btn-del").click(function(){
		var text = $(".screen").html();

		console.log(text);
		$(".screen").html(text.slice(0,-1));

	});

	$("#btn-ans").click(function(){

	});

	$("#btn-heart").click(function(){

	});
