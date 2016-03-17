//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////      FCC PROJECT
//////////////////////////
/////////////////////////			SIMON GAME
//////
/////
////      Pablo Bordons Estrada
///		  15/03/2016
//



var simon = {


	// a function to be called at the beginning of the page
	initialize : function(){

		// simon.logic.power();
		simon.control.enableBtn();
		// simon.control.set();

	},

	state : {

		on : false,

		strict: false,

		keyUpMakesSense: false,

		setOnState : function(){

			// strict is false
			simon.state.strict = false;

			// strict pilot is off
			simon.buttons.others.strictPilot.css("background-color","#2F050B");

			// count is active
			simon.buttons.others.count.css("color","#D30D23");

			// count is set to --
			simon.buttons.others.count.html("--");

			// on token is on the left
			simon.buttons.others.power.css("float","left");

			// state.on is true
			simon.state.on = true;



			//!!!


			// erase the current game  -> a method is needed for this
			// simon.gameMachine.game = {};






			// enable keys
			// simon.control.enableKeys();

			// // destroy the oscillator
			// simon.soundSystem.destroyOscillator();


			//...


			//...


			// show a spiral!!
			simon.keyLight.spiralSafe(12,50,true);

		},

		setOffState : function(){

			// strict is false
			simon.state.strict = false;

			// strict pilot is off
			simon.buttons.others.strictPilot.css("background-color","#2F050B");

			// count is not active
			simon.buttons.others.count.css("color","#40060F");

			// count is set to --
			simon.buttons.others.count.html("--");

			// on token is on the right
			simon.buttons.others.power.css("float","right");

			// state.on is false
			simon.state.on = false;





			//!!!


			// erase the current game  -> a method is needed for this
			// simon.gameMachine.game = {};
			if(simon.gameMachine.game != undefined) simon.gameMachine.game.gameOver();





			// disable keys
			// simon.control.disableKeys();

			// destroy the oscillator
			simon.soundSystem.stopSound();

			// destroy the error oscilator
			if(simon.soundSystem.oscillatorError!= undefined) simon.soundSystem.oscillatorError.stop();


			//...


			//...


			// if the error spiral is running, kill it
			if(simon.keyLight.spiralBusy) simon.keyLight.spiralBusy = false;
			// show a spiral!!
			simon.keyLight.spiralSafe(9,100,true);


		}

	},

	// object storing the game logic
	gameMachine : {

		// constructor
		Game : function(){

			// game state (recording or showing)
			this.recording = false;

			// color rows
			this.colorRow = [];

			this.addColor = function(color){
				this.colorRow.push(color);
			};

			this.addRandomColor = function(){

				var colors = Object.keys(simon.keyColor);

				this.addColor(simon.tools.pickRandom(colors));

			};

			// color row input
			this.colorRowInput = [];

			this.addColorInput = function(color){
				this.colorRowInput.push(color);
			};


			// counter
			this.counter = 0;

			// timer to end game (3 sec)
			this.timer = undefined;

			// start turn
			this.startTurn = function(){

				// set recording on false
				simon.gameMachine.game.recording = false;

				// disable keys
				simon.control.disableKeys();

				// key up doesn't make sense
				simon.state.keyUpMakesSense = false;

				// turn off all the keys
				simon.keyLight.deactivateKey("green");
				simon.keyLight.deactivateKey("red");
				simon.keyLight.deactivateKey("blue");
				simon.keyLight.deactivateKey("yellow");

				// this.counter ++
				simon.gameMachine.game.counter++;

				// send the counter to the display
				simon.buttons.others.count.html(simon.gameMachine.game.counter);

				// add a color to the Color Row
				simon.gameMachine.game.addRandomColor();

				// after the row, start recording is called
				var endFunction = simon.gameMachine.game.startRecording;

				// adjust time with the dificulty
				var time = 1000 - simon.gameMachine.game.counter*40;

				time = time < 0 ? 0 : time;

				console.log("TIME IS" + time);
				// call the flash row with the input color
				simon.keyLight.flashRowSafe(simon.gameMachine.game.colorRow,"init",time,false,true,endFunction);


			};

			// like new turn, but no color is added
			this.repeatTurn = function(){

				// set recording on false
				simon.gameMachine.game.recording = false;

				// disable keys
				simon.control.disableKeys();

				// key up doesn't make sense
				simon.state.keyUpMakesSense = false;

				// turn off all the keys
				simon.keyLight.deactivateKey("green");
				simon.keyLight.deactivateKey("red");
				simon.keyLight.deactivateKey("blue");
				simon.keyLight.deactivateKey("yellow");

				// send the counter to the display
				simon.buttons.others.count.html(simon.gameMachine.game.counter);

				// after the row, start recording is called
				var endFunction = simon.gameMachine.game.startRecording;

				// call the flash row with the input color
				simon.keyLight.flashRowSafe(simon.gameMachine.game.colorRow,"init",1000,false,true,endFunction);

			};

			// start recorgind
			this.startRecording = function(){
				console.log("GO!");

				// set input to 0
				simon.gameMachine.game.colorRowInput = [];

				//set recording on true;
				simon.gameMachine.game.recording = true;

				// every time a key is pressed reset the countdown and start a new one
				simon.gameMachine.game.startEndTimer();

				// enable keys
				simon.control.enableKeys();

				// the rest of the logic is managed from the keys
			};

			this.startEndTimer = function(time){

				// default time 3 seconds
				time = time ? time : 3000;

				//kill previous timer
				this.killEndTimer();
				//start a new one
				this.timer = setTimeout(function(){
					console.log("Time's up");
					simon.gameMachine.game.wrong();

				},time);

			};

			this.killEndTimer = function(){
				clearTimeout(this.timer);
				this.timer = undefined;
			};

			this.wrong = function(){

				// show silent spiral! (different if strict is on)
				simon.keyLight.spiralSafe(10,100,false);

				// disable keys
				simon.control.disableKeys();

				// key up doesn't make sense
				simon.state.keyUpMakesSense = false;

				// kill timer
				simon.gameMachine.game.killEndTimer();

				// erase the input color
				simon.gameMachine.game.colorRowInput = [];

				console.log("wrong key or time is out");
				console.log("strict is "+simon.state.strict);

				// play Error sound
				simon.soundSystem.playError();
				// send !! to counter
				simon.buttons.others.count.html("!!");

				// if strict is on:
				if(simon.state.strict){

					console.log("strict end");

					window.setTimeout(function(){

						// show the on spiral 
						simon.keyLight.spiralSafe(12,50,true);
						// stop error sound
						simon.soundSystem.stopSound();

						// set new game
						simon.gameMachine.game.gameOver();

					},1000);					

				}
				else{

					console.log("no strict end");

					// repeat turn
					window.setTimeout(function(){

						// stop error sound
						simon.soundSystem.stopSound();

						// repeat turn
						window.setTimeout(function(){
							if(simon.state.on) simon.gameMachine.game.repeatTurn();

						},500);

					},1000);
				}

			},

			// function to be called when the player fails and strict is on
			this.gameOver = function(){

				// kill the timer
				simon.gameMachine.game.killEndTimer();

				// set new game
				simon.gameMachine.game = undefined;

			}
		},
		// instantiate a new game
		setNewGame : function(){

			if(simon.gameMachine.game != undefined) simon.gameMachine.game.gameOver();

			// turn everything off
			simon.gameMachine.game = new simon.gameMachine.Game();

			// send the counter to the display
			simon.buttons.others.count.html(simon.gameMachine.game.counter);

		}

	},

	tools : {

		pickRandom : function(arr){

			var len = arr.length;

			var randomInRange = Math.random()*len;

			var randomIndex = Math.floor(randomInRange);

			return arr[randomIndex];

		}

	},

	// Colors for the keys, on and off
	keyColor : {

		green : {
			off: "green",//"#49A738",
			on: "#34A742"
		},

		red : {
			on: "red",//"#910F09",
			off: "#980F11"
		},

		yellow : {
			on: "yellow",//"#C6A700",
			off: "#C9A700"
		},

		blue : {
			on: "blue",//"#214C95",
			off: "#184B92"
		}

	},

	keySound : {

		green : 164.81,

		red : 220,

		blue : 261.63,

		yellow : 329.63

	},

	// light effect for the keys
	// sound has been included!!
	keyLight : {

		// change the color to on for a key
		activateKey : function(key){
			var color = simon.keyColor[key].on;
			simon.buttons.keys[key].css("background-color",color);
		},

		// change the color to off for a key
		deactivateKey : function(key){
			var color = simon.keyColor[key].off;
			simon.buttons.keys[key].css("background-color",color);
		},

		// flash row!!
		/**
		***   Recursive function with safe mode (cannot be called if spiral is in execution)
		**/
		// flash every color in a given row with break between flashes 
		// when the function is called, the keys are disable

		// the function call itself changing the value of break to create silent intervals
		// between flashes

		flashRow : function(row,index,time,rest,sound,endFunction){

			if(!simon.state.on) {
				simon.keyLight.busy = false;
				console.log("BYE BYE Flash Row!");
				return;}

			// rest is false
			// allows interval between flashes
			if(!rest){

				// if index == init, it's first call
				if(index == "init") index = row.length - 1;

				// if index is zero, return and finish
				if(index < 0) {
					// row finished, safe is off
					simon.keyLight.busy = false;

					// function to be called at the end of the row
					endFunction();

					return;
				}

				// start from the beginning each time
				var i = row.length - 1 - index; 
				
				// key light
				simon.keyLight.activateKey(row[i]);
				
				// if sound is active
				if(sound){ 
					// play the key sound
					simon.soundSystem.playSound(simon.keySound[row[i]]);
				}

				// wait until the next call
				window.setTimeout(function(){

					//deactivate the key after given time
					simon.keyLight.deactivateKey(row[i]);

					//stop the sound
					if(sound) simon.soundSystem.stopSound();

					// call recursively, same time, one index less:
					simon.keyLight.flashRow(row,index-1,time,!rest,sound,endFunction);

				},time);
			}
			// rest between flashes
			else{
				window.setTimeout(function(){
					simon.keyLight.flashRow(row,index,time,!rest,sound,endFunction);
				},time/3);
			}

		},

		flashRowSafe : function(row,index,time,rest,sound,endFunction){

			// first time we call busy, busy is undefined
			if(!simon.keyLight.busy){
				// message to alert the flash row has been called
				console.log("flash Row!");
				// the spiral is in execution
				simon.keyLight.busy = true;
				// call the spiral
				simon.keyLight.flashRow(row,index,time,rest,sound,endFunction);
			}
			// if spiral is in execution, alert with error message
			else console.log("Flash Row is busy!");
		},

		// spiral of light!!
		/**
		***   Recursive function with safe mode (cannot be called if spiral is in execution)
		**/
		// creates an spiral, flashing through the colors 'index' times in natural order
		spiral : function(index,time,sound){
			
			// if index is zero, return and finish
			if(index == 1) {
				// spiral finish, safe is off
				simon.keyLight.spiralBusy = false;
				return;
			}

			// array of colors to iterate
			var colors = Object.keys(simon.keyColor);

			// index for the color
			var colorIndex = index%4;

			// activate the key
			simon.keyLight.activateKey(colors[colorIndex]);

			// if sound is active
			if(sound){ 
				// play the key sound
				simon.soundSystem.playSound(simon.keySound[colors[colorIndex]]);
			}

			window.setTimeout(function(){
				//deactivate the key after given time
				simon.keyLight.deactivateKey(colors[colorIndex]);

				//stop the sound
				if(sound) simon.soundSystem.stopSound();

				// call recursively, same time, one index less:
				simon.keyLight.spiral(index-1,time,sound);
			},time);

		},

		// safe spiral
		/**
		*** The way to call the spiral in Safe Mode (cannot be called if spiral is in execution)
		**/
		spiralSafe : function(index,time,sound){

			// first time we call piralSafe, spiralBusy is undefined
			if(!simon.keyLight.spiralBusy){

				// message to alert the spiral has been called
				console.log("spiral!");
				// the spiral is in execution
				simon.keyLight.spiralBusy = true;
				// call the spiral
				simon.keyLight.spiral(index,time,sound);

			}
			// if spiral is in execution, alert with error message
			else console.log("hey you! Spiral is busy!");
		}

	},

	// the sound system to generate the notes, play them and stop them
	soundSystem : {

		// the context where the methods are stored
		context : new AudioContext,

		////// methods I want: start sound, stop sound

		playSound : function(freq){

			// prevent play sounds if oscillator already exists

			if(simon.soundSystem.oscillator == undefined){

				// create the context
				simon.soundSystem.oscillator = simon.soundSystem.context.createOscillator();

				// send the frequency
				if(freq == "error") {
					simon.soundSystem.oscillator.type = 'triangle';
					freq = 210;
				}
				simon.soundSystem.oscillator.frequency.value = freq;

				// send to destination
				simon.soundSystem.oscillator.connect(simon.soundSystem.context.destination);

				// start the sound
				simon.soundSystem.oscillator.start(0.0);

			}
			else{
				console.log("There's already an oscillator!!");
			}



		},

		playError : function(){

			// prevent play sounds if oscillator already exists

			if(simon.soundSystem.oscillatorError == undefined){

				// destroy the normal oscillator if it exists to prevent deformed sounds
				simon.soundSystem.stopSound();

				// create the context
				simon.soundSystem.oscillatorError = simon.soundSystem.context.createOscillator();

				// send the frequency

				simon.soundSystem.oscillatorError.type = 'triangle';

				simon.soundSystem.oscillatorError.frequency.value = 210;

				// send to destination
				simon.soundSystem.oscillatorError.connect(simon.soundSystem.context.destination);

				// start the sound
				simon.soundSystem.oscillatorError.start(0.0);

				// stop the error sound
				window.setTimeout(function(){

					// stop it
					simon.soundSystem.oscillatorError.stop();

					// destroy it
					simon.soundSystem.oscillatorError = undefined;


				},1000);

			}
			else{
				console.log("There's already an oscillatorError!!");
			}

		},

		stopSound : function(){

			// look for the oscillator
			if(simon.soundSystem.oscillator!= undefined){

				// stop it
				simon.soundSystem.oscillator.stop();

				// destroy it
				simon.soundSystem.oscillator = undefined;

			}
			else{
				console.log("There's no oscillator!");
			}

		}

	},

	// buttons for the simon game
	buttons : {

		// Color keys
		keys : {

			green : $(".key-green"),

			red : $(".key-red"),

			yellow : $(".key-yellow"),

			blue : $(".key-blue"),

		},

		start : $(".simon-btn-start"),

		strict : $(".simon-btn-strict"),

		power : $(".simon-btn-power"),

		// labels, tokens, and other DOM elements
		others : {

			power : $(".simon-btn-power-token"),

			strictPilot : $(".simon-pilot-strict"),

			count : $("#count"),

			asterisk : $("*")

		}

	},

	// functions to be called by the user
	logic : {

		keyDown : function(color){

			// key up makes sense
			simon.state.keyUpMakesSense = true;

			// push the color
			simon.gameMachine.game.colorRowInput.push(color);

			// retrieve the right color:
			// number of elements clicked by the user up to now (0,1..)
			var inputLength = simon.gameMachine.game.colorRowInput.length;

			// the right color is the element number equal to the number of elements in input
			var rightColor = simon.gameMachine.game.colorRow[inputLength - 1];
			var simonLength = simon.gameMachine.game.colorRow.length;

			console.log(simon.gameMachine.game.colorRowInput);
			console.log(simon.gameMachine.game.colorRow);


			/// three posibilities: 1 right and last, 2 right and not last, 3 wrong
			if(simonLength == inputLength && color == rightColor){

				// play until release (max 2 sec)
				simon.soundSystem.playSound(simon.keySound[color]);

				// kill the timer
				simon.gameMachine.game.killEndTimer();

				// deactivate keys so you cannot press again
				simon.control.disableKeys();

				// call new startTurn
				window.setTimeout(function(){

					// key up doesn't make sense
					simon.state.keyUpMakesSense = false;

					// stop the sound (in case user hasn't released)
					simon.soundSystem.stopSound();
					// call new startTurn
					window.setTimeout(function(){
						if(simon.state.on) simon.gameMachine.game.startTurn();
					},600);

				},1000);

			}
			else if(color == rightColor){

				// play until release (max 3 sec)
				simon.soundSystem.playSound(simon.keySound[color]);

				// start a timer
				simon.gameMachine.game.startEndTimer();

			}
			else{

				// key up doesn't make sense
				simon.state.keyUpMakesSense = false;

				// force release
				// don't play sound, don't light up
				// call wrong
				simon.gameMachine.game.wrong();

			}

		},

		key : (function(){

			var up = {};

			var down = {};

			var colors = ["green","red","yellow","blue"];

			var myFunctionDown = function(color){

				return function(){
					console.log(color+" DOWN!");
					// set the key down to true
					simon.control.keyDown[color] = true;

					// game logic
					simon.logic.keyDown(color);
					// sound logic
					// simon.soundSystem.playSound(simon.keySound[color]);
					// light logic
					simon.keyLight.activateKey(color);
				}

			};

			var myFunctionUp = function(color){

				return function(){
					if(simon.state.keyUpMakesSense){

						simon.state.keyUpMakesSense = false;

						console.log(color+" UP!");

						// sound logic
						simon.soundSystem.stopSound();
						// light logic
						simon.keyLight.deactivateKey(color)

						simon.control.keyDown[color] = false;

					}
				}

			}

			for(var c in colors){

				down[colors[c]] = myFunctionDown(colors[c]);

				up[colors[c]] = myFunctionUp(colors[c]);
			}


			return { down, up };

		})(),

		asterisk : function(){

			if(simon.control.keyDown.green) simon.logic.key.up.green();
			if(simon.control.keyDown.red) simon.logic.key.up.red();
			if(simon.control.keyDown.blue) simon.logic.key.up.blue();
			if(simon.control.keyDown.yellow) simon.logic.key.up.yellow();

		},

		start : function(){
			if(simon.state.on){
				console.log("start!");
				simon.gameMachine.setNewGame();
				simon.gameMachine.game.startTurn();
			}
			else{
				console.log("please turn simon on!");
			}
		},

		strict : function(){

			// simon must be on
			if(simon.state.on){

				// if strict is off:
				if(!simon.state.strict){

					simon.state.strict = true;
					simon.buttons.others.strictPilot.css("background-color","red");
					console.log("strict set to "+simon.state.strict);
				}
				// if strict is on:
				else{

					simon.state.strict = false;
					simon.buttons.others.strictPilot.css("background-color","#2F050B");
					console.log("strict set to "+simon.state.strict);
				}


			}

		},

		power : function(){

			// if simon is off:
			if(!simon.state.on){
				console.log("on");
				simon.state.setOnState();
			}
			// if simon is on:
			else{
				console.log("off");
				simon.state.setOffState();
			}

		}

	},

	// asign the logic to the DOM elements
	control : {

		// enable and disable start, strict and power
		enableBtn : function(){
			console.log("enabling buttons");
			this.start = simon.buttons.start.click(simon.logic.start);
			this.strict = simon.buttons.strict.click(simon.logic.strict);
			this.power = simon.buttons.power.click(simon.logic.power);
			this.asterisk = simon.buttons.others.asterisk.mouseup(simon.logic.asterisk);

		},

		// store the keys
		keys : {},

		// enable keys
		enableKeys : function(){
			console.log("enabling keys");

			var colors = Object.keys(simon.keyColor);

			for(var color in colors){

				var c = colors[color];

				//down
				this.keys[c] = simon.buttons.keys[c].mousedown(simon.logic.key.down[c]);

				//hover
				simon.buttons.keys[c].addClass("clickable-key");
				

			}

			// this.control.asterisk = simon.buttons.others.asterisk.mouseup(simon.logic.asterisk);

		},

		// disable keys
		disableKeys : function(){
			console.log("disabling keys");

			var colors = Object.keys(simon.keyColor)

			for(var color in colors){

				var c = colors[color];

				//down
				this.keys[c] = simon.buttons.keys[c].unbind('mousedown',simon.logic.key.down[c]);

				//hover
				simon.buttons.keys[c].removeClass("clickable-key");

			}

			// this.control.asterisk = simon.buttons.others.asterisk.unbind("mouseup",simon.logic.asterisk);


		},

		// store the condition of the keys (down)
		keyDown : {

			green : false,

			red : false,

			blue : false,

			yellow : false

		}


		///// END


	}

};




simon.initialize();


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


