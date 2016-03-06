
//////////////////////////
/////////////////////////
//////
/////
////      Pomodoro
///
//



var pomodoro = {

	currentTime : "workTime",

	play : false,

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
			if(!pomodoro[stateTime].raw == undefined) {console.log(stateTime+".raw not found"); return;}


			var raw = pomodoro[stateTime].raw;


			if(raw <= 0){ 
				console.log("changing state");
				pomodoro.changeState(stateTime);
				return;
			}

			raw -= 1;

			pomodoro[stateTime].set(raw);

			display.update(stateTime);
			console.log(stateTime + " : "+pomodoro[stateTime].raw);
			pomodoro.countDown(stateTime);

		},1000);

	},

	pause : function(){

		clearTimeout(pomodoro.timer);

	},

	changeState : function(stateTime){

		display.load();

		if(stateTime == "workTime"){
			console.log("break time!");

			pomodoro.currentTime = "breakTime";

			pomodoro.countDown("breakTime");
		}
		else if(stateTime == "breakTime"){
			console.log("work time!");

			pomodoro.currentTime = "workTime";

			pomodoro.countDown("workTime");
		}
		else {console.log("error in changeState")}

	}


};




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

			if(!pomodoro.play){

				// change play state to true
				pomodoro.play = true;

				// start the countdown in the current state:
				var state = pomodoro.currentTime;
				pomodoro.countDown(state);

				//turn play down
				display.buttons.start.addClass("btn-off");
				//turn pause on
				display.buttons.pause.removeClass("btn-off");
			}

					
		},

		pause : function(){

			if(pomodoro.play){

				// change play state to false
				pomodoro.play = false;

				// pause the pomodoro
				pomodoro.pause();

				//turn play on
				display.buttons.start.removeClass("btn-off");
				//turn pause down
				display.buttons.pause.addClass("btn-off");

			}
					

		},

		reset : function(){

				pomodoro.currentTime = "workTime";
				pomodoro.play = false;
				pomodoro.pause();
				display.load();
				display.update();

				display.buttons.start.removeClass("btn-off");
				display.buttons.pause.addClass("btn-off");

		},

		workTimeMinusBtn : function(){

					var currentTime = display.screen.workTime.html();

					if(currentTime > 1 ){

						currentTime--;

						display.screen.workTime.html(currentTime);

						display.load("workTime");

						display.update(pomodoro.currentTime);

						display.buttons.workTimePlusBtn.removeClass("btn-off");

					}
					else if(currentTime == 1){
						currentTime--;

						display.screen.workTime.html(currentTime);

						display.load("workTime");

						display.update(pomodoro.currentTime);

						display.buttons.workTimeMinusBtn.addClass("btn-off");

						display.buttons.workTimePlusBtn.removeClass("btn-off");

					}
					else{
						display.buttons.workTimeMinusBtn.addClass("btn-off");
					}

		},

		workTimePlusBtn : function(){

					var currentTime = display.screen.workTime.html();

					if(currentTime < 58){

						currentTime++;

						display.screen.workTime.html(currentTime);

						display.load("workTime");

						display.update(pomodoro.currentTime);

						display.buttons.workTimeMinusBtn.removeClass("btn-off");


					}
					else if(currentTime == 58){

						currentTime++;

						display.screen.workTime.html(currentTime);

						display.load("workTime");

						display.update(pomodoro.currentTime);

						display.buttons.workTimePlusBtn.addClass("btn-off");

						display.buttons.workTimeMinusBtn.removeClass("btn-off");

					}
					else{
						display.buttons.workTimePlusBtn.addClass("btn-off");
					}
		},

		breakTimeMinusBtn : function(){

					var currentTime = display.screen.breakTime.html();

					if(currentTime > 1 ){

						currentTime--;

						display.screen.breakTime.html(currentTime);

						display.load("breakTime");

						display.update(pomodoro.currentTime);

						display.buttons.breakTimePlusBtn.removeClass("btn-off");

					}
					else if(currentTime == 1){
						currentTime--;

						display.screen.breakTime.html(currentTime);

						display.load("breakTime");

						display.update(pomodoro.currentTime);

						display.buttons.breakTimeMinusBtn.addClass("btn-off");

						display.buttons.breakTimePlusBtn.removeClass("btn-off");

					}
					else{
						display.buttons.breakTimeMinusBtn.addClass("btn-off");
					}

		},

		breakTimePlusBtn : function(){

					var currentTime = display.screen.breakTime.html();

					if(currentTime < 29){

						currentTime++;

						display.screen.breakTime.html(currentTime);

						display.load("breakTime");

						display.update(pomodoro.currentTime);

						display.buttons.breakTimeMinusBtn.removeClass("btn-off");


					}
					else if(currentTime == 29){

						currentTime++;

						display.screen.breakTime.html(currentTime);

						display.load("breakTime");

						display.update(pomodoro.currentTime);

						display.buttons.breakTimePlusBtn.addClass("btn-off");

						display.buttons.breakTimeMinusBtn.removeClass("btn-off");

					}
					else{
						display.buttons.breakTimePlusBtn.addClass("btn-off");
					}

		}

	},

	update : function(state){

		if(state == undefined){
			display.update("workTime");
			display.update("breakTime");
		}

		else{

			var min = (pomodoro[state].min < 10 ? "0" : "") + pomodoro[state].min;
			var sec = (pomodoro[state].sec < 10 ? "0" : "") + pomodoro[state].sec;

			display.screen.minutes.html(min);
			display.screen.seconds.html(sec);

		}
	},

	load : function(workTime){

		if(workTime == undefined){
			display.load("workTime");
			display.load("breakTime");
		}
		else{

			var workTimeRaw = display.screen[workTime].html() * 60;
			pomodoro[workTime].set(workTimeRaw);

		}
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


// hay que cambiar:

//ejemplo, todo a verde:

//pomodoro:






///////////// colors


// color constructor

var Color = function(pomodoro,pomodoroBorder,buttons,buttonsBorder,buttonsHover,screen,screenBorder,letter){

	this.pomodoro = pomodoro;

	this.pomodoroBorder = pomodoroBorder;

	this.buttons = buttons;

	this.buttonsBorder = buttonsBorder;

	this.buttonsHover = buttonsHover;

	this.screen  = screen;

	this.screenBorder  = screenBorder;

	this.letter = letter;

	this.letterHover = "black";
};

// set color

function setColor (color){

	$(".item").css("background-color",color.pomodoro).css("border-color",color.pomodoroBorder);


	//screens
	for(var i in display.screen){

		display.screen[i].parent().css("background-color",color.screen).css("border-color",color.screenBorder);

	}

	//buttons:
	for(var i in display.buttons){

		display.buttons[i].css("background-color",color.buttons).css("border-color",color.buttonsBorder);

	}
}

var colors = {};


colors.green = new Color ("#CCFE66","#A7CC44","#A3CC52","#F0FFA0","#F0FFA0","#E0FFA4","#A7CC44","#A7CC44");

colors.original = new Color("#F66340","#D34319","#D34319","#A43128","#9D3124","#F89E88","#A43128","#41140F");

// setColor(colors.original);

display.load();
display.update();


