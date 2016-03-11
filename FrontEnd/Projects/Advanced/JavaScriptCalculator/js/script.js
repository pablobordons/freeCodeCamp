/*
NOTE: after =, dot substitute the number or is it added to the number?

Current state: substitute



NOTE 2: add parenthesis



NOTE 3: prevent eval from injections

*/


//////////////////////////
/////////////////////////
//////
/////
////      CALCULATOR STATE
///
//


var calculatorState = {

	// key values

	screen : $(".screen"),

	screenValue : "",

	ansValue : 0,

	//keys you can press
	"/" : true,
	"x" : true,
	"-" : true,
	"+" : true,
	"." : true,

	equal : true,

	"A" : false,

	"0" : true,
	"1" : true,
	"2" : true,
	"3" : true,
	"4" : true,
	"5" : true,
	"6" : true,
	"7" : true,
	"8" : true,
	"9" : true,

	waiting : false,
	
	lastKey : "",

	// check values:

	numTrue : function(){

		var condition = this["0"] 
					  & this["1"]
					  & this["2"]
					  & this["3"]
					  & this["4"]
					  & this["5"]
					  & this["6"]
					  & this["7"]
					  & this["8"]
					  & this["9"];

		return condition ? true : false;
	},

	opTrue : function(){

		var condition = this["/"] 
					  & this["x"]
					  & this["+"]
					  & this["-"]
					  & this["equal"];

		return condition ? true : false;
	},

	// set values:

	setNumTrue : function(){
		this["0"] = true;
		this["1"] = true;
		this["2"] = true;
		this["3"] = true;
		this["4"] = true;
		this["5"] = true;
		this["6"] = true;
		this["7"] = true;
		this["8"] = true;
		this["9"] = true;
	},

	setNumFalse : function(){
		this["0"] = false;
		this["1"] = false;
		this["2"] = false;
		this["3"] = false;
		this["4"] = false;
		this["5"] = false;
		this["6"] = false;
		this["7"] = false;
		this["8"] = false;
		this["9"] = false;
	},

	setOpTrue : function(){
		this["/"] = true;
		this["x"] = true;
		this["-"] = true;
		this["+"] = true;
		this["equal"] = true;
	}, 

	setOpFalse : function(){
		this["/"] = false;
		this["x"] = false;
		this["-"] = false;
		this["+"] = false;
		this["equal"] = false;
	}, 

	setAllTrue : function(){
		numTrue();
		opTrue();
		this["A"] = true;
		this["."] = true;
	},

	setAllFalse : function(){
		this.setNumFalse();
		this.setOpFalse();
		this["A"] = false;
		this["."] = false;
	},

	// set states:

	saveState : function(){

		var state = {

				ansValue : this["ansValue"],

				"/" : this["/"],
				"x" : this["x"],
				"-" : this["-"],
				"+" : this["+"],
				"." : this["."],

				equal : this["equal"],

				"A" : this["A"],

				"0" : this["0"],
				"1" : this["1"],
				"2" : this["2"],
				"3" : this["3"],
				"4" : this["4"],
				"5" : this["5"],
				"6" : this["6"],
				"7" : this["7"],
				"8" : this["8"],
				"9" : this["9"]
		}

		return state;
	},

	setState : function(state){


				this["ansValue"] = state["ansValue"];

				this["/"] = state["/"];
				this["x"] = state["x"];
				this["-"] = state["-"];
				this["+"] = state["+"];
				this["."] = state["."];

				this["equal"] = state["equal"];

				this["A"] = state["A"];

				this["0"] = state["0"];
				this["1"] = state["1"];
				this["2"] = state["2"];
				this["3"] = state["3"];
				this["4"] = state["4"];
				this["5"] = state["5"];
				this["6"] = state["6"];
				this["7"] = state["7"];
				this["8"] = state["8"];
				this["9"] = state["9"];
	},

	setInitialState : function(){

		this.ansValue = 0;

		this["/"] = true;
		this["x"] = true;
		this["-"] = true;
		this["+"] = true;
		this["."] = true;

		this.equal = true;

		this["A"] = false;

		this["0"] = true;
		this["1"] = true;
		this["2"] = true;
		this["3"] = true;
		this["4"] = true;
		this["5"] = true;
		this["6"] = true;
		this["7"] = true;
		this["8"] = true;
		this["9"] = true;

	}
}



////////////////////////////
///////////////////////////
//////////////////////////
/////////////////////////
//////
/////
////      LOGIC
///
//
///////////////////
//////////////////
/////////////////



function pushKey(key){

	calculatorState.lastKey = key;

	calculatorState.screen.append(key); 

	console.log(calculatorState.lastKey);
}

function pushNumber(num){

	if(checkLength()){
		if(calculatorState.numTrue()) {
	
			if(calculatorState.lastKey == "equal") {
				calculatorState.screen.html("");
			}

			cleanZeroes();

			pushKey(num);
	
			calculatorState.setOpTrue();
	
			calculatorState["A"] = false;
	
		}
		else syntaxError();
	}
	else {

		if(calculatorState.lastKey == "equal") {
				calculatorState.screen.html("");
				pushNumber(num);
			}
		else tooManyFigures();
	}
}

function pushOperation(operation){
	if(checkLength()){
		if(calculatorState[operation]){

			pushKey(operation);

			calculatorState.setOpFalse();

			calculatorState.setNumTrue();

			calculatorState["."] = true;

			calculatorState["A"] = true; 

			calculatorState["-"] = calculatorState.lastKey != "-"
								 ? true
								 : false;

		}

		else syntaxError();
	}
	else tooManyFigures();
}

function pushDot(){

	if(checkLength()){
		if(calculatorState["."]){

			if(calculatorState.lastKey == "equal") {
				calculatorState.screen.html("");
			}

			pushKey(".");
			calculatorState["."] = false;

		}

		else syntaxError();
	}
	else tooManyFigures();
}

function pushAns(){

	if(checkLength()){
		if(calculatorState["A"]){

			if(calculatorState.lastKey == "equal") {
				calculatorState.screen.html("");
			}

			pushKey("A");

			calculatorState.setOpTrue();
			calculatorState.setNumFalse();
			calculatorState["A"] = false;
			calculatorState["."] = false;
		}

		else syntaxError();
	}
	else {

		if(calculatorState.lastKey == "equal") {
				calculatorState.screen.html("");
				pushAns();
			}
		else tooManyFigures();
	}
}

function pushEqual(){

	if(calculatorState["equal"]){

		if(calculatorState.lastKey == "A") calculatorState.setNumTrue();

		calculatorState.lastKey = "equal";

		var onScreen = calculatorState.screen.html();
	
		// replace A and x
		onScreen = onScreen.replace(/A/g,calculatorState.ansValue);
		onScreen = onScreen.replace(/x/g,"*");
		onScreen = onScreen.replace(/--/g,"+");

		var result = eval(onScreen);

		if(result.toString().length > 15) result = result.toPrecision(8);

		calculatorState.ansValue = result ;

		calculatorState.screen.html(result.toString());

		calculatorState["A"] = true;
		calculatorState["."] = true;

		$(".ans-value").html(calculatorState.ansValue.toString());

	}

	else syntaxError();
}

function pushAC(){

	calculatorState.lastKey = "ac";

	calculatorState.screen.html("");
	calculatorState.setInitialState();
}

function pushDel(){

	calculatorState.lastKey = "del";

	var text = calculatorState.screen.html();

	var deletedElement = text[text.length-1];

	// when deleting a symbol, allow to type that symbol again:
	calculatorState[deletedElement] = true;

	switch(deletedElement){
		case "+":
		case "-":
		case "/":
		case "x":
			calculatorState.setOpTrue();
			break;
		case "A":
			calculatorState.setNumTrue();
			calculatorState["A"] = true;
			break;
	}

	var lastElement = text[text.length-2];

	switch(lastElement){
		case "-":
			calculatorState.setOpFalse();
			calculatorState["A"] = true;
			calculatorState["-"] = false;
			break;
		case "+":
		case "/":
		case "x":
			calculatorState.setOpFalse();
			calculatorState["A"] = true;
			calculatorState["-"] = true;
			break;
		case "A":
			calculatorState["A"] = false;
			calculatorState["."] = false;
			calculatorState.setNumFalse();
			break;
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case ".":
			calculatorState["A"] = false;
			break;

		

	}

	calculatorState.screen.html(text.slice(0,-1));
}

function pushHeart(){

	if(!calculatorState.waiting){

		calculatorState.waiting = true;

		var onScreen = calculatorState.screen.html();

		var message = randomMessage();

		calculatorState.screen.html(message);
		

		var currentState = calculatorState.saveState();

		calculatorState.setAllFalse();

		window.setTimeout(function(){

			calculatorState.setState(currentState);

			calculatorState.screen.html(onScreen);

			calculatorState.waiting = false;
			
		},800);
	}
}




////////////////////////////
///////////////////////////
//////////////////////////
/////////////////////////
//////
/////
////      DISPLAY LOGIC
///
//


function cleanZeroes(){

	var con1 = calculatorState.screen.html().length > 0;

	var con2 = calculatorState.screen.html()[0] == "0";

	var con3 = calculatorState.screen.html()[1] != ".";

	if(con1 && con2 && con3){

		var text = calculatorState.screen.html();

		calculatorState.screen.html(text.slice(1));
	}
}

function checkLength(){

	var length = calculatorState.screen.html().length;
	console.log(length);
	return  length < 15
			?  true
			:  false

}



////////////////////////////
///////////////////////////
//////////////////////////
/////////////////////////
//////
/////
////      MESSAGES
///
//

function syntaxError(){

	if(!calculatorState.waiting){
		
		calculatorState.waiting = true;

		var onScreen = calculatorState.screen.html();

		calculatorState.screen.html("Syntax ERROR");
		
		var currentState = calculatorState.saveState();

		calculatorState.setAllFalse();

		window.setTimeout(function(){

			calculatorState.setState(currentState);

			calculatorState.screen.html(onScreen);

			calculatorState.waiting = false;

		},400);

	}
}

function tooManyFigures(){

	if(!calculatorState.waiting){
		
		calculatorState.waiting = true;

		var onScreen = calculatorState.screen.html();

		calculatorState.screen.html("NO MEMORY");
		

		var currentState = calculatorState.saveState();

		calculatorState.setAllFalse();

		window.setTimeout(function(){

			calculatorState.setState(currentState);

			calculatorState.screen.html(onScreen);

			calculatorState.waiting = false;

		},400);

	}
}

function randomMessage(){

	var messages = [
						"I <i class='fa fa-heart'></i> MATH TOO...",
						"I <i class='fa fa-heart'></i> MATH TOO...",
						"I <i class='fa fa-heart'></i> MATH TOO...",
						"I <i class='fa fa-heart'></i> MATH TOO...",
						"I <i class='fa fa-heart'></i> MATH TOO...",
						"I <i class='fa fa-heart'></i> MATH TOO...",
						"I <i class='fa fa-heart'></i> MATH TOO..."
					];

	var len = messages.length;

	var randomInRange = Math.random()*len;

	var randomIndex = Math.floor(randomInRange);

	return messages[randomIndex];
}

function scrollMessage(message){

	message = message.split("");

	// save current state and screen
	var currentState = calculatorState.saveState();
	var currentScreen = calculatorState.screen.html();

	// clean the screen and pause the state:
	calculatorState.screen.html("");
	calculatorState.setAllFalse();




	// self invoking function

	var maxLoops = message.length;
	var counter = -1;

	(function next(){

		if(counter++ >= maxLoops) {
			calculatorState.screen.html(currentScreen);
			calculatorState.setState(currentState);
			return;
		}

		setTimeout(function(){
			calculatorState.screen.append(message[counter]);
			next();
		},100)

	})();



	



}


//////////////////////////
/////////////////////////
//////
/////
////      BUTTONS
///
//


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
		pushDot();
	});

	$("#btn-divided").click(function(){
		pushOperation("/");
	});

	$("#btn-times").click(function(){
		pushOperation("x");
	});

	$("#btn-plus").click(function(){
		pushOperation("+");
	});

	$("#btn-minus").click(function(){
		pushOperation("-");
	});

	$("#btn-equal").click(function(){
		pushEqual();
	});

/// others

	$("#btn-ac").click(function(){
		pushAC();
	});

	$("#btn-del").click(function(){
		pushDel();
	});

	$("#btn-ans").click(function(){
		pushAns();
	});

	$("#btn-heart").click(function(){
		pushHeart();
	});


//////////////////////////
/////////////////////////
//////
/////
////      EFFECTS
///
//


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
