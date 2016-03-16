
//////////////////////////
/////////////////////////
//////
/////
////      SIMON
///
//



var simon = {

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

			


			//...

		}

	},


	// Colors for the keys, on and off
	keyColor : {

		green : {
			on: "green",//"#49A738",
			off: "#34A742"
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

		// spiral of light!!
		/**
		***   Recursive function with safe mode (cannot be called if spiral is in execution)
		**/
		spiral : function(index,time){
			
			// if index is zero, return and finish
			if(index == 0) {
				// spiral finish, safe is off
				simon.keyLight.spiralBusy = false;
				return;
			}

			// array of colors to iterate
			var colors = ["green","red","blue","yellow"];

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

simon.control.set();

simon.logic.on();
