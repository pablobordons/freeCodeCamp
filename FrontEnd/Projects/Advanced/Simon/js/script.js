
//////////////////////////
/////////////////////////
//////
/////
////      SIMON
///
//



var simon = {


	buttons : {

		keys : {

			green : $(".key-green"),

			red : $(".key-red"),

			yellow : $(".key-yellow"),

			blue : $(".key-blue")

		},

		start : $(".simon-btn-start"),

		strict : $(".simon-btn-strict"),

		on : $(".simon-btn-on")

	},

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
			console.log("strict");
		},

		on : function(){
			console.log("on");
		}

	},

	control : {

		keys : {

		},

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
