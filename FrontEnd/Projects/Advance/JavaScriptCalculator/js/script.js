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

////// calculator state


var calculatorState = {

	ans : 0,

	dot : true,
	plus : true,
	minus : true,
	times : true,
	divided : true,
	number: true,

	pushedEqual : false,

	allTrue : function (){
		this.dot = true;
		this.plus = true;
		this.minus = true;
		this.times = true;
		this.divided = true;
		this.number = true;
	},

	allFalse : function (){
		this.dot = false;
		this.plus = false;
		this.minus = false;
		this.times = false;
		this.divided = false;
		this.number = false;
	},

	opTrue : function (){
		this.plus = true;
		this.minus = true;
		this.times = true;
		this.divided = true;
	},

	opFalse : function (){
		this.plus = false;
		this.minus = false;
		this.times = false;
		this.divided = false;
	}

};





////// buttons:


function checkLength(){

	var length = $(".screen").html().length;

	return     (length < 15)
			?  true
			:  false

}

function cleanZeroes(){

	if($(".screen").html().length > 0){
		if($(".screen").html()[0] == "0"){
			var text = $(".screen").html();
			$(".screen").html(text.slice(1));
		}
	}
}

function pushKey(key){
	if(calculatorState.pushedEqual){
		$(".screen").html("");
		calculatorState.pushedEqual = false;
	}
	cleanZeroes();
	if(checkLength()) $(".screen").append(key);
}

function pushNumber(number){
	pushKey(number);
	calculatorState.opTrue();
}

function pushOperation(operation){
	pushKey(operation);
	calculatorState.allTrue();
}

function pushEqual(){

	var onScreen = $(".screen").html();

	result.replace("A",calculatorState.ans);

	var result = eval(onScreen);

	calculatorState.ans = result;

	$(".screen").html(result);

	calculatorState.pushedEqual = true;
}

function pushAns(){
	pushNumber("A");
}

/// numbers

	$("#btn-zero").click(function(){
		pushNumber("0");
	});

	$("#btn-one").click(function(){
		pushNumber("1");
	});

	$("#btn-two").click(function(){
		pushNumber("2");
	});

	$("#btn-three").click(function(){
		pushNumber("3");
	});

	$("#btn-four").click(function(){
		pushNumber("4");
	});

	$("#btn-five").click(function(){
		pushNumber("5");
	});

	$("#btn-six").click(function(){
		pushNumber("6");
	});

	$("#btn-seven").click(function(){
		pushNumber("7");
	});

	$("#btn-eight").click(function(){
		pushNumber("8");
	});

	$("#btn-nine").click(function(){
		pushNumber("9");
	});



/// operations

	$("#btn-dot").click(function(){
		if(calculatorState.dot){
			pushOperation(".");
			calculatorState.dot = false;
		}
	});

	$("#btn-divided").click(function(){
		if(calculatorState.divided){
			pushOperation("/");
			calculatorState.divided = false;
		}

	});

	$("#btn-times").click(function(){
		if(calculatorState.times){
			pushOperation("*");
			calculatorState.times = false;
		}
	});

	$("#btn-plus").click(function(){
		if(calculatorState.plus){
			pushOperation("+");
			calculatorState.plus = false;
		}
	});

	$("#btn-minus").click(function(){
		if(calculatorState.minus){
			pushOperation("-");
			calculatorState.minus = false;
		}
	});

	$("#btn-equal").click(function(){
		pushEqual();
	});

/// others

	$("#btn-ac").click(function(){

		calculatorState.allTrue();
		$(".screen").html("");

	});


	$("#btn-del").click(function(){

		var text = $(".screen").html();
		
		// when deleting a symbol, allow to type that symbol again:
		switch(text[text.length-1]){
			case ".":
				calculatorState.dot = true;
				break;
			case "+":
				calculatorState.plus = true;
				break;
			case "-":
				calculatorState.minus = true;
				break;
			case "/":
				calculatorState.divided = true;
				break;
			case "*":
				calculatorState.times = true;
				break;
		}

		$(".screen").html(text.slice(0,-1));

	});

	$("#btn-ans").click(function(){
		pushAns();
	});

	$("#btn-heart").click(function(){

	});
