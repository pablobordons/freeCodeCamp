//////////////////////////
/////////////////////////
//////
/////
////      Pomodoro
///
//



var pomodoro = {

	workTime : {

		set : function(raw){

			this.raw = raw;

			this.min = Math.floor(raw/60);

			this.sec = raw - this.min*60;

		}
	},

	breakTime : {

		set : function(raw){

			this.raw = raw;

			this.min = Math.floor(raw/60);

			this.sec = raw - this.min*60;

		}
	},

	countDown : function(stateTime){



		pomodoro.timer = setTimeout(function(){

			//exit if raw hasn't been set
			if(!pomodoro[stateTime].raw) {console.log(stateTime+".raw not found"); return;}


			var raw = pomodoro[stateTime].raw;


			if(raw <= 0){ return;}

			raw -= 1;

			pomodoro[stateTime].set(raw);

			display.update(stateTime);

			pomodoro.countDown(stateTime);

		},1000);

	},

	pause : function(){

		clearTimeout(pomodoro.timer);

	}


};




// var pomodoro = {

// 	//second: 0
// 	screen : $(".screen"),

// 	screenMin : $(".screen-element-min"),

// 	screenSec : $(".screen-element-sec"),


// 	pomodoro : $("#pomodoro"),

// 	// the second the pomodoro is in:
// 	workTime : 100,

// 	breakTime : 50,


// 	// number of pomodori
// 	pomodori : 0,

// 	state : "pause",

// 	countDown : function(stateTime){

// 		pomodoro.timer = setTimeout(function(){

// 			if(pomodoro[stateTime] <= 0){ return;}

// 			pomodoro[stateTime] -= 1;

// 			console.log(pomodoro[stateTime]);
// 			pomodoro.display();

// 			pomodoro.countDown(stateTime);

// 		},1000);

// 	},

// 	pause : function(){

// 	clearTimeout(pomodoro.timer);

// 	},

// 	display : function(){

// 		this.screenSec.html(this.workTime);
// 	}

// 	// addPomodori : function(){

// 	// 	this.pomodori++;

// 	// },

// 	// getWorkTime : function(state){

// 	// 	var hola = $(".option-worktime .option-element-number").html();

// 	// 	console.log(hola);

// 	// },

// 	// getBreakTime : function(state){

// 	// 	var hola = $(".option-breaktime .option-element-number").html();

// 	// 	console.log(hola);

// 	// }
// 	// setState : function(state){

// 	// 	switch(state){

// 	// 		case "working":

// 	// 			pomodoro.pomodoro.css("background-color","red");
// 	// 			break;

// 	// 		case "break":
// 	// 			pomodoro.pomodoro.css("background-color","blue");
// 	// 			break;

// 	// 	}

// 	// }


// }



//////////////////////////
/////////////////////////
//////
/////
////      Buttons
///
//

/*

	display
		buttons (dom elements)
		logic (function triggered by the buttons)
		control (link btn-function)

*/


var display = {



	screen : {

		minutes : $(".screen-element-min"),

		seconds : $(".screen-element-sec"),

		workTime : $(".option-worktime .option-element-number span"),

		breakTime : $(".option-breaktime .option-element-number span")
	},

	buttons : {

		start : $("#btn-start"),

		pause : $("#btn-pause"),

		reset : $("#btn-reset"),

		workTimeMinusBtn: $(".option-worktime .option-element-minus"),

		workTimePlusBtn: $(".option-worktime .option-element-plus"),

		breakTimeMinusBtn: $(".option-breaktime .option-element-minus"),

		breakTimePlusBtn: $(".option-breaktime .option-element-plus")

	},

	logic : {

		start : function (){

					pomodoro.countDown("workTime");
					console.log("start!");
		},

		pause : function(){

					pomodoro.pause();
					console.log("pause!");

		},

		reset : function(){

					console.log("RESET");

		},

		workTimeMinusBtn : function(){

					// add number

					console.log("workTimeMinusBtn");
		},

		workTimePlusBtn : function(){

					console.log("workTimePlusBtn");
		},

		breakTimeMinusBtn : function(){

					console.log("breakTimeMinusBtn");

		},

		breakTimePlusBtn : function(){

					console.log("breakTimePlusBtn");

		}

	},

	update : function(state){

		display.screen.minutes.html(pomodoro[state].min);
		display.screen.seconds.html(pomodoro[state].sec);
	}

}

display.control = {

	start : display.buttons.start.click(display.logic.start),

	pause : display.buttons.pause.click(display.logic.pause),

	reset : display.buttons.reset.click(display.logic.reset),

	workTimeMinusBtn : display.buttons.workTimeMinusBtn.click(display.logic.workTimeMinusBtn),

	workTimePlusBtn : display.buttons.workTimePlusBtn.click(display.logic.workTimePlusBtn),

	breakTimeMinusBtn : display.buttons.breakTimeMinusBtn.click(display.logic.breakTimeMinusBtn),

	breakTimePlusBtn : display.buttons.breakTimePlusBtn.click(display.logic.breakTimePlusBtn)

}


// for(var i in display.screen){

// 	display.screen[i].parent().css("background-color","green");
// }





