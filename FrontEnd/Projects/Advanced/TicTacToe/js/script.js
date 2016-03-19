
//////////////////////////
/////////////////////////
//////
/////
////      Tic Tac Toe
///
//


var engine = {

	start : function(player){

		engine.player = player;
		display.loadBoard();
		engine.getEmptyMoves();

		ia.player = player == "cross" ? "circle" : "cross";

	},
	// get the empty moves in a board
	// if no board is passed, load the empty moves of the engine.board into engine.emptyMoves
	getEmptyMoves : function(board){

		// set the default mode to false
		var def = false;

		// if board is not given
		if(board == undefined && engine.board != undefined) {
			// get the engine.board
			board = engine.board;
			// set the default mode to true
			def = true;
		}

		var emptyMoves = [];

		// for every element in the board:
		for(var row = 0; row < 3; row++){
			for(var col = 0; col<3; col++){
				// if the element is zero, push it to the empty moves
				if(!board[row][col]){
					emptyMoves.push([row,col]);
				}
			}
		}

		// if default mode is true, load the moves and return undefined
		if(def){engine.emptyMoves = emptyMoves;}

		// if default mode is false, return the moves
		else {return emptyMoves;}

	},

	clone : function(board){

		board = board == undefined ? engine.board : board;

		var newBoard = [];
		for(var r = 0; r<3; r++){
			var newRow = [];
			for(var c = 0; c<3; c++){
				newRow.push(board[r][c]);
			}
			newBoard.push(newRow);
		}

		return newBoard;
	},

	// add a move [X,Y] with value 0, 1 or 2 to a board
	addMove : function(move,value,board){

		//if no board is given, take the engine.board
		board = board == undefined ? engine.board : board;

		var newBoard = engine.clone(board);

		if(value != 1 && value != 2 && value != 0) {console.log("wrong value"); return;}
		
		newBoard[move[0]][move[1]] = value;

		return newBoard;

	},

	// return 1 if cross wins
	// return 2 if circle wins
	// return -1 if it's a tie but there're spaces left
	// return 0 if it's a tie 
	evaluateBoard : function(board){

		board = board == undefined ? engine.board : board;

		// check in every possible arrays if there are a all equal 1 or 2

		// arrays to evaluate: diagonals, verticals, horizontals:

		// diagonals:
		var arr = engine.tools.getDiagonal(board);

		// vertical lines:
		var boardT = engine.tools.transpose(board);

		for(var row in board){
		arr.push(board[row]);
		arr.push(boardT[row]);
		}

		// now let's evaluate every row:
		// check if in any of them all are 1 or 2:
		// if so, return the number
		for(var i = 0; i<arr.length; i++){
			// evaluaterow returns 1, 2 or 0:
			// if the evaluation of the row is not 0 in any of them, return that number:

			var evaluation = engine.tools.evaluateRow(arr[i]);

			if(evaluation) {
			  return evaluation;
			  };
		}

		//check if there're spaces left: (tie and final game)
		if(engine.tools.findInMatrix(board,0)) return 0;

		// return tie and continue (spaces left)
		return -1;

	},


	// win : function (board, player){

	// 	player = player == undefined ? engine.player : player;

	// 	// player can be set as cross or circle, or as 1 or 2

	// 	player = player == "cross" || player == 1
	// 		   ? 1 
	// 		   : player == "circle" || player == 2
	// 		   ? 2 
	// 		   : "error";

	// 	return player == this.evaluateBoard(board) ? true : false;

	// },

	// wouldWin : function(board, player, move, value){

	// 	board = 

	// }

	setPlayer : function(player){

		engine.player = player;

		ia.player = player == "cross" ? "circle" : "cross";

	},

	tools : {

		// print a readable board:
		debug : function(board,move,value){

			board = board == undefined ? engine.board : board;

			if(move != undefined && value != undefined) board[move[0]][move[1]] = value;

			// returns a readable board:
			var readableBoard = "";
			for(var row = 0; row<3;row++){
				readableBoard += "|";
				readableBoard += board[row].join("|").replace(/2/g,"O").replace(/1/g,"X").replace(/0/g," ");
				readableBoard += "|\n";
			}
			console.log(readableBoard)
			return readableBoard;
		},


		// Math tools for the evaluation of the board:

		// transpose a matrix:
		transpose : function(a){
		  var m = [];
		  for(var i in a){
		    var row = []
		    for(var j in a[i]){
		        row.push(a[j][i]); 
		    } 
		    m.push(row);
		  }
		  return m;
		},

		//get diagonals:
		getDiagonal : function(m){
		  var posDiagonal = [];
		    var negDiagonal = [];
		    var l = m.length;
		    for(var j = 0 ; j<l;j++){
		    negDiagonal.push(m[j][j]);
		    posDiagonal.push(m[j][l-1-j])
		    }
		    return [posDiagonal,negDiagonal];
		},

		//evaluate a row
		evaluateRow : function(arr){
		   //if not all are the same:
		   if(!engine.tools.allEqual(arr)) return 0;

		   // all equal to:
		   else{
		      // 1 wins
		      if(arr[0]==1) return 1;
		      // 2 wins
		      else if(arr[0]==2) return 2;
		      // all 0
		      else return 0;
		    }
		},

		// find out if all elements in an array are equal:
		allEqual : function(array){
		  for(var i=1; i<array.length;i++){
		    if(array[i] != array[i-1]) return false;
		  }
		  return true;
		},

		// if val is in the matrix return true:
		findInMatrix : function(m,val){
		  for(var row in m) 
		    for(var col in m[row]) 
		      if (m[row][col] == val) return true;
		  return false;
		}

	}

};


var display = {


	// different move options, cross, circle or empty
	moves : {

		cross : '<div class="move move-cross"><i class="fa fa-times"></i></div>',

		circle : '<div class="move move-circle"><i class="fa fa-circle-o"></i></div>',

		empty : '<div class="move move-empty"></div>'

	},


	// create the board in the page
	htmlBoard : function(){

		var board = "";

		for(var row = 1; row < 4; row++){
			var newRow = '<div class="row">';
			for(var col = 1; col < 4; col++){
				newRow += "<div class='square'><div class='move move-empty'></div></div>";
			}
			board += newRow+'</div>';
		}

		this.setItem();
		$(".board").html(board);

	},

	setInitialState : function(){

		var initialState = '<div class="menu">'
						 + '<div class="btn-player btn-cross"><i class="fa fa-times"></i></div>'
						 + '<div class="btn-player btn-circle"><i class="fa fa-circle-o"></i></div>'
						 + '<div class="btn-player btn-vs">'
						 + '<i class="fa fa-user"></i><i class="fa fa-bolt"></i><i class="fa fa-user"></i></div>'
						 + '</div>';

		this.setItem();
		$(".board").html(initialState);

		this.buttons.set();
		this.control.set();

	},

	setMenuState : function(){

		var menu = '<div class="overlay-menu overlay">'
				 +		'<div class="btn-player btn-reset">'
				 +				'<i class="fa fa-refresh fa-spin"></i>'	
				 +		'</div>'
				 +	'</div>';

		$(".item").append(menu);

		this.buttons.set();
		this.control.set();


	},

	setItem : function(){

		var item = '<div class="board"></div>'
				 + '<h5 class="reference">coded by <a title="pboest profile on freecodecamp"href="#">pboest</a></h5>';
			
		$(".item").html(item);
	},

	/*
			1 Set the html board
			2 get the access to the DOM board and store it in DOMBoard
			3 set the buttons 
			4 asign functions to the buttons	
	*/
	setDOMBoard : function(){
		// 1 set the html board
		this.htmlBoard();

		// 2 get access to the DOM board
		var board = [];
		for(var row = 1; row < 4; row++){
			var newRow = [];
			for(var col = 1; col < 4; col++){
				var square = $(".row:nth-child("+row+") .square:nth-child("+col+")");
				newRow.push(square);
			}
			board.push(newRow);
		}
		this.DOMBoard = board;
		
		// set the buttons and the control
		this.buttons.set();
		this.control.set();

	},

	// print a board. If no board is given, print the board in engine.board
	printBoard : function(board){

		if(board == undefined) board = engine.board;

		// for every square in display.board, add the proper move;

		// for every row
		for(var row in this.DOMBoard){
			// for every col:
			for(var col in this.DOMBoard[row]){

				// retrieve the element in the given board and send it to the dom Board
				switch(board[row][col]){
					case 0:
						this.DOMBoard[row][col].html(this.moves.empty);
						break;
					case 1:
						this.DOMBoard[row][col].html(this.moves.cross);
						break;
					case 2:
						this.DOMBoard[row][col].html(this.moves.circle);
						break;
					default:
						console.log("error in board");
						break;
				}

			}
		}
	},


	// load the board printed in the DOM into the engine.board
	// if an argument is passed, return the board instead
	loadBoard : function(board){

		if(board != undefined){
			engine.board = engine.clone(board);
			return;
		}

		var newBoard = [];

		for(var row = 0; row < 3 ; row++){

			var newRow = [];

			for(var col = 0; col < 3 ; col++){

				var move = display.DOMBoard[row][col].children();

				var newElement; 

				if(move.hasClass("move-empty")){
					newElement = 0;
				}
				else if(move.hasClass("move-cross")){
					newElement = 1;
				}
				else if(move.hasClass("move-circle")){
					newElement = 2;
				}
				else{
					console.log("error loading the board");
				}

				newRow.push(newElement);				

			}

			newBoard.push(newRow);
		}

		// depending on the mode, return the new Board or load it into the engine
		engine.board = newBoard;
		
	},


	// reference to the DOM buttons
	buttons : {
		// every square in the dom
		set : function(){
			this.cell = $(".square");

			this.playerCross = $(".btn-cross");

			this.playerCircle = $(".btn-circle");

			this.playerVS = $(".btn-vs");

			this.reset = $(".btn-reset");
		}

	},

	// functions to assing to the buttons
	logic : {

		// pressing a cell
		press : function(){

			//console.log("you're pressing a cell!");

			// if the cell is empty:
			if($(this).children().hasClass("move-empty")){

				switch(engine.player){	

					case "cross":
						$(this).html(display.moves.cross);
						// engine.player = "circle";
						if(engine.versusMode){
							engine.player = "circle";	
						}
						break;
					case "circle":
						$(this).html(display.moves.circle);
						// engine.player = "cross";
						if(engine.versusMode){
							engine.player = "cross";
						}
						break;
					default:
						console.log("player hasn't been set.");
						break;

				}

				display.loadBoard();

				engine.getEmptyMoves();
				// console.log(engine.win(engine.board,1));
				// console.log(engine.win(engine.board,2));

				// console.log(engine.evaluateBoard());
				if(engine.evaluateBoard()) {
					display.setMenuState();
					return;
				}

				// ia moves:
				if(!engine.versusMode){
					var newMove = ia.move(engine.board);
					var value = ia.player == "cross" ? 1 : 2;
					var newBoard = engine.addMove(newMove,value,engine.board);
					
					
					display.loadBoard(newBoard);
					display.printBoard();
					
					if(engine.evaluateBoard(newBoard)) {
						display.setMenuState();
						return;
					}
				}
			}
			else{
				console.log("this cell was occupied.");
			}
		},

		enter : function(){

			//console.log("you're entering a cell!");

			// asign the hover movement depending on the player (cross or circle):
			var move = engine.player == "cross" 
						 ? display.moves.cross 
						 : engine.player == "circle" ? display.moves.circle : "";

			// if the cell is empty, 
			// 1 add the move to the html
			// 2 add a hover-class to be able to remove the move later:
			if($(this).children().hasClass("move-empty")){
				$(this).children().html(move).addClass("move-hover");
			}

		},


		leave : function(){

						//console.log("you're leaving a cell!");

			// if the cell was originally empty (has the class move-hover)
			// change it to empty and remove the move-hover class
			if($(this).children().hasClass("move-hover")){
				$(this).html(display.moves.empty).removeClass("move-hover");
			}
		},

		playerCross : function(){

			display.setDOMBoard();

			engine.start("cross");

			engine.versusMode = false;

		},

		playerCircle : function(){

			display.setDOMBoard();

			engine.start("circle");

			var newMove = ia.move(engine.board);

			var newBoard = engine.addMove(newMove,1,engine.board);
			
			
			display.loadBoard(newBoard);
			display.printBoard();
			// engine.board[1][1] = 1;
			// display.printBoard();


			engine.versusMode = false;
		},	

		playerVS : function(){

			display.setDOMBoard();

			engine.start("cross");

			engine.versusMode = true;
		},

		reset : function(){

			display.setInitialState();
			console.log("RESET");
		}

	},

	// assign the logic to the buttons
	control : {

		set : function(){

			this.cell = display.buttons.cell.click(display.logic.press);

			this.enter = display.buttons.cell.mouseenter(display.logic.enter);

			this.leave = display.buttons.cell.mouseleave(display.logic.leave);

			this.playerCross = display.buttons.playerCross.click(display.logic.playerCross);

			this.playerCircle = display.buttons.playerCircle.click(display.logic.playerCircle);

			this.playerVS = display.buttons.playerVS.click(display.logic.playerVS);

			this.reset = display.buttons.reset.click(display.logic.reset);

		}

	}

};


display.setInitialState();

ia = {

	// return the best move
	move : function(board){

		var iaValue = engine.player == "cross" ? 2 : 1;
		var plValue = engine.player == "cross" ? 1 : 2;

		var empty = engine.getEmptyMoves(board);
		// return empty[0];
		// return a move

		console.log("thinking...");

		// 1 find a winning spot
			for(var m in empty){

				var row = empty[m][0];
				var col = empty[m][1];

				var newBoard = engine.clone(board);

				newBoard[row][col] = iaValue;

				if(engine.evaluateBoard(newBoard) == iaValue) {
					return empty[m];
				}

			};

		console.log("after 1");

		// 2 block a winning spot:
			for(var m in empty){

				row = empty[m][0];
				col = empty[m][1];

				newBoard = engine.clone(board);

				newBoard[row][col] = plValue;

				if(engine.evaluateBoard(newBoard) == plValue) {
					return empty[m];
				}

			};

		console.log("after 2");

		// 3 create a for
			// for(var m in empty){

			// 	row = empty[m][0];
			// 	col = empty[m][1];

			// 	newBoard = engine.clone(board);

			// 	newBoard[row][col] = iaValue;

			// 	// fill a spot and check everywhere looking for winning positions. 
			// 	var empty2 = engine.getEmptyMoves(newBoard);

			// 	var counter = 0;

			// 	for(var m2 in empty2){

			// 		var row2 = empty2[m2][0];
			// 		var col2 = empty2[m2][1];

			// 		var newBoard2 = engine.clone(newBoard);

			// 		newBoard2[row2][col2] = iaValue;

			// 		if(engine.evaluateBoard(newBoard2) == iaValue) counter++;

			// 	}

			// 	if(counter > 1) return empty[m];

			// };

		// 4 prevent a fork:
			// for(var m in empty){

			// 	row = empty[m][0];
			// 	col = empty[m][1];

			// 	newBoard = engine.clone(board);

			// 	newBoard[row][col] = plValue;

			// 	// fill a spot and check everywhere looking for winning positions. 
			// 	var empty2 = engine.getEmptyMoves(newBoard);

			// 	var counter = 0;

			// 	for(var m2 in empty2){

			// 		var row2 = empty2[m2][0];
			// 		var col2 = empty2[m2][1];

			// 		var newBoard2 = engine.clone(newBoard);

			// 		newBoard2[row2][col2] = plValue;

			// 		if(engine.evaluateBoard(newBoard2) == plValue) counter++;

			// 	}

			// 	if(counter > 1) return empty[m];

			// };
		
		console.log("after 4");

		// // 5 center is free
			for(var m in empty){
				if(empty[m][0] == 1 && empty[m][1] == 1) return [1,1];
			}
		
		console.log("after 5");

		// 6 Opposite corner
			// corner 1 [0,0]
			if(engine.board[0][0] == plValue && engine.board[2][2] == 0) return [2,2];
			// corner 2 [0,2]
			if(engine.board[0][2] == plValue && engine.board[2][0] == 0) return [2,0];
			// corner 3 [2,0]
			if(engine.board[2][0] == plValue && engine.board[0][2] == 0) return [0,2];
			// corner 4 [2,2]
			if(engine.board[2][2] == plValue && engine.board[0][0] == 0) return [0,0];

		console.log("after 6");	

		// two opposite corners ocuppied

			// corner 1 [0,0] and 4 [2,2]
			if(engine.board[2][2] == plValue && engine.board[0][0] == plValue) {

				// side 1 [0,1] free
				if(engine.board[0][1] == 0) return [0,1];
				// side 2 [1,2] free
				if(engine.board[1][2] == 0) return [1,2];
				// side 3 [2,1] free
				if(engine.board[2][1] == 0) return [2,1];
				// side 4 [1,0] free
				if(engine.board[1][0] == 0) return [1,0];

			}

			// corner 2 [0,2] and 3 [2,0]
			if(engine.board[0][2] == plValue && engine.board[2][0] == plValue) {

				// side 1 [0,1] free
				if(engine.board[0][1] == 0) return [0,1];
				// side 2 [1,2] free
				if(engine.board[1][2] == 0) return [1,2];
				// side 3 [2,1] free
				if(engine.board[2][1] == 0) return [2,1];
				// side 4 [1,0] free
				if(engine.board[1][0] == 0) return [1,0];

			}
		console.log(engine.board[0][2] == plValue);
		console.log(engine.board[2][0] == plValue);
		console.log("after opposite side");
		// 7 empty corner
			// corner 1 [0,0]
			if(engine.board[0][0] == 0) return [0,0];
			// corner 2 [0,2]
			if(engine.board[0][2] == 0) return [0,2];
			// corner 3 [2,0]
			if(engine.board[2][0] == 0) return [2,0];
			// corner 4 [2,2]
			if(engine.board[2][2] == 0) return [2,2];

		console.log("after 7");
		// 8 empty side
			// side 1 [0,1]
			if(engine.board[0][1] == 0) return [0,1];
			// side 2 [1,0]
			if(engine.board[1][0] == 0) return [1,0];
			// side 3 [1,2]
			if(engine.board[1][2] == 0) return [1,2];
			// side 4 [2,1]
			if(engine.board[2][1] == 0) return [2,1];

		console.log("after 8");
		// if everything else fails...
		return empty[0];

	}


};
