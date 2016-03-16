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
	start : function(){

		simon.control.set();

		simon.logic.on();

	},

	state : {

		on : false,

		strict: false,

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
			simon.buttons.others.on.css("float","left");

			// state.on is true
			simon.state.on = true;

			// show a spiral!!
			simon.keyLight.spiralSafe(10,90);

			// erase the current game
			simon.gameMachine.game = {};


			//...

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
			simon.buttons.others.on.css("float","right");

			// state.on is false
			simon.state.on = false;

			// show a spiral!!
			simon.keyLight.spiralSafe(9,100);

			// erase the current game
			simon.gameMachine.game = {};


			//...

		}

	},

	// object storing the game logic
	gameMachine : {

		// start game

		// distinguish beetween show/record---> think about this.
		// if game is on, there're only two modes, record, and show.
		// the basic one is record, show is an spectacle, 
		// count flash, game flash.. etc

		// this should be an object that can be called... and started

		// constructor
		Game : function(){

			// game state (recording or showing)
			this.recording = false;

			// color rows
			this.colorRow = [];
			this.addColor = function(color){
				this.colorRow.push(color);
			},

			this.addRandomColor = function(){

				var colors = Object.keys(simon.keyColor);

				this.addColor(simon.tools.pickRandom(colors));

			}

			// counter
			this.counter = 0;


			// start turn
			this.startTurn = function(){

				// this.counter ++
				this.counter++;

				// send the counter to the display
				simon.buttons.others.count.html(this.counter);

				// add a color to the Color Row
				this.addRandomColor();

				// for every color in the row, flash one
				// for(var color in this.colorRow){
				// 	console.log(this.colorRow[color]);
				// }
				simon.keyLight.flashRow(this.colorRow,"init",1000);

			}



		},

		// instantiate a new game
		setNewGame : function(){
			simon.gameMachine.game = new simon.gameMachine.Game();
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

	// light effect for the keys
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

		// change the color to on for a given time, and put it back to off
		flash : function(key,time){

			// if key color is wrong, wxit with an error
			if(key == "green" || key == "red" || key == "yellow" || key == "blue"){

				// turn key on
				simon.keyLight.activateKey(key);
				// turn key off after a given time:
				setTimeout(function(){simon.keyLight.deactivateKey(key)},time);
			}
			// error message
			else console.log("key color doesn't exists!\n>>'green','red','yellow','blue'.");

		},

		// flash row!!
		/**
		***   Recursive function with safe mode (cannot be called if spiral is in execution)
		**/
		// flash every color in a given row with break between flashes 
		flashRow : function(row,index,time,rest){

			// break is false
			if(!rest){

				if(index == "init") index = row.length - 1;

				// if index is zero, return and finish
				if(index < 0) {
					// row finished, safe is off
					simon.keyLight.busy = false;
					return;
				}

				var i = row.length - 1 - index; 
				console.log(row[i]);
				simon.keyLight.activateKey(row[i]);

				window.setTimeout(function(){
					//deactivate the key after given time
					simon.keyLight.deactivateKey(row[i]);
					// call recursively, same time, one index less:
					simon.keyLight.flashRow(row,index-1,time,!rest);
				},time);
			}
			else{
				console.log("break")
				window.setTimeout(function(){
					simon.keyLight.flashRow(row,index,time,!rest);
				},time/3);
			}

		},

		// spiral of light!!
		/**
		***   Recursive function with safe mode (cannot be called if spiral is in execution)
		**/
		// creates an spiral, flashing through the colors 'index' times in natural order
		spiral : function(index,time){
			
			// if index is zero, return and finish
			if(index == 0) {
				// spiral finish, safe is off
				simon.keyLight.spiralBusy = false;
				return;
			}

			// array of colors to iterate
			var colors = Object.keys(simon.keyColor);

			// index for the color
			var colorIndex = index%4;

			// this works as a flash that calles itself after finishing
			// activate the key
			simon.keyLight.activateKey(colors[colorIndex]);

			window.setTimeout(function(){
				//deactivate the key after given time
				simon.keyLight.deactivateKey(colors[colorIndex]);
				// call recursively, same time, one index less:
				simon.keyLight.spiral(index-1,time);
			},time);

		},

		// safe spiral
		/**
		*** The way to call the spiral in Safe Mode (cannot be called if spiral is in execution)
		**/
		spiralSafe : function(index,time){

			// first time we call piralSafe, spiralBusy is undefined
			if(!simon.keyLight.spiralBusy){

				// message to alert the spiral has been called
				console.log("spiral!");
				// the spiral is in execution
				simon.keyLight.spiralBusy = true;
				// call the spiral
				simon.keyLight.spiral(index,time);

			}
			// if spiral is in execution, alert with error message
			else console.log("hey you! Spiral is busy!");
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

		on : $(".simon-btn-on"),

		// labels, tokens, and other DOM elements
		others : {

			on : $(".simon-btn-on-token"),

			strictPilot : $(".simon-pilot-strict"),

			count : $("#count")

		}

	},

	// functions to be called by the user
	logic : {

		keys : {

			green : function(){
				console.log("green");
			},

			red : function(){
				console.log("red");
			},

			yellow : function(){
				console.log("yellow");
			},

			blue : function(){
				console.log("blue");
			}

		},

		start : function(){
			console.log("start!");
		},

		strict : function(){

			// simon must be on
			if(simon.state.on){

				// if strict is off:
				if(!simon.state.strict){

					simon.state.strict = true;
					simon.buttons.others.strictPilot.css("background-color","red");
					console.log("strict"+simon.state.strict);
				}
				// if strict is on:
				else{

					simon.state.strict = false;
					simon.buttons.others.strictPilot.css("background-color","#2F050B");
					console.log("strict"+simon.state.strict);
				}


			}


		},

		on : function(){
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

		// store the key control (after set has been called)
		keys : {},

		set : function(){

			this.keys.green = simon.buttons.keys.green.click(simon.logic.keys.green);
			this.keys.red = simon.buttons.keys.red.click(simon.logic.keys.red);
			this.keys.yellow = simon.buttons.keys.yellow.click(simon.logic.keys.yellow);
			this.keys.blue = simon.buttons.keys.blue.click(simon.logic.keys.blue);

			this.start = simon.buttons.start.click(simon.logic.start);
			this.strict = simon.buttons.strict.click(simon.logic.strict);
			this.on = simon.buttons.on.click(simon.logic.on);

		}

	}

};





//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


simon.start();
simon.gameMachine.setNewGame();

var g = simon.gameMachine.game;

