
//////////////////////////
/////////////////////////
//////
/////
////      Tic Tac Toe
///
//


var engine = {

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

	// add a move [X,Y] with value 0, 1 or 2 to a board
	addMove : function(move,value,board){

		//if no board is given, take the engine.board
		board = board == undefined ? engine.board : board;

		if(value != 1 && value != 2 && value != 0) {console.log("wrong value"); return;}
		
		board[move[0]][move[1]] = value;

		return board;

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
		if(engine.tools.findInMatrix(board,0)) return -1;

		// return tie and continue (spaces left)
		return 0;

	},

	win : function (board, player){

		player = player == undefined ? engine.player : player;

		// player can be set as cross or circle, or as 1 or 2

		player = player == "cross" || player == 1
			   ? 1 
			   : player == "circle" || player == 2
			   ? 2 
			   : "error";

		return player == this.evaluateBoard(board) ? true : false;

	},

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

		$(".board").html(board);

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
	loadBoard : function(mode){

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
		if(mode == undefined) { engine.board = newBoard;}
		else{ return newBoard; }
		
	},


	// reference to the DOM buttons
	buttons : {
		// every square in the dom
		set : function(){
			this.cell = $(".square");
		}

	},

	// functions to assing to the buttons
	logic : {

		// pressing a cell
		press : function(){

			console.log("you're pressing a cell!");

			// // if the cell is empty:
			// if($(this).children().hasClass("move-empty")){

			// 	switch(engine.player){	

			// 		case "cross":
			// 			$(this).html(display.moves.cross);
			// 			engine.player = "circle";
			// 			break;
			// 		case "circle":
			// 			$(this).html(display.moves.circle);
			// 			engine.player = "cross";
			// 			break;
			// 		default:
			// 			console.log("player hasn't been set.");
			// 			break;

			// 	}

			// 	display.loadBoard();

			// 	engine.getEmptyMoves();


			// }
			// else{
			// 	console.log("this cell was occupied.");
			// }
		},

		enter : function(){

						console.log("you're entering a cell!");

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

						console.log("you're leaving a cell!");

			// if the cell was originally empty (has the class move-hover)
			// change it to empty and remove the move-hover class
			if($(this).children().hasClass("move-hover")){
				$(this).html(display.moves.empty).removeClass("move-hover");
			}
		}

		
	},

	// assign the logic to the buttons
	control : {

		set : function(){

			this.cell = display.buttons.cell.click(display.logic.press);

			this.enter = display.buttons.cell.mouseenter(display.logic.enter);

			this.leave = display.buttons.cell.mouseleave(display.logic.leave);

		}

	}

};



var me = "cross";
var it = "circle";

var d = engine.tools.debug;


var T = [[1,2,0],
		 [0,2,0],
		 [0,0,0]];

win = function(board){
	var state = engine.evaluateBoard(board);
	if(state == 1) return 1;
	if(state == 2) return -1;
	return 0;
}


// var choice;
// var myTurn = true;

// minimax = function(board){

// 	myTurn = !myTurn;

// 	if(win(board)) {
// 		console.log("OVER");
// 		myTurn = !myTurn;
// 		return win(board);}


// 	var moves = [];
// 	var scores = [];

// 	var emptyMoves = engine.getEmptyMoves(board);

// 	var val = myTurn ? 1 : 2;

// 	var pick = myTurn ? pickMax : pickMin;


// 	for(var move in emptyMoves){

// 		var row = emptyMoves[move][0];
// 		var col = emptyMoves[move][1];

// 		var newBoard = clone(board);

// 		newBoard[row][col] = val;

// 		d(newBoard);

// 		scores.push(minimax(newBoard));
// 		moves.push(emptyMoves[move]);


// 	}

// 	myTurn = !myTurn;

// 	var picked = pick(moves,scores);

// 	choice = picked[0];
// 	console.log(moves);
// 	console.log(scores);
// 	console.log("I'm picking " + choice);

	
// 	return picked[1];
	
// }

// I'm cross

// win = function(board){

// 	// check if 1 win:
// 	var c1 = board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1;
// 	var c2 = board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1;
// 	var c3 = board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1;

// 	var c4 = board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1;
// 	var c5 = board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1;
// 	var c6 = board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1;

// 	var c7 = board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1;
// 	var c8 = board[0][2] == 1 && board[1][1] == 1 && board[0][2] == 1;

// 	var d1 = board[0][0] == 2 && board[0][1] == 2 && board[0][2] == 2;
// 	var d2 = board[1][0] == 2 && board[1][1] == 2 && board[1][2] == 2;
// 	var d3 = board[2][0] == 2 && board[2][1] == 2 && board[2][2] == 2;

// 	var d4 = board[0][0] == 2 && board[1][0] == 2 && board[2][0] == 2;
// 	var d5 = board[0][1] == 2 && board[1][1] == 2 && board[2][1] == 2;
// 	var d6 = board[0][2] == 2 && board[1][2] == 2 && board[2][2] == 2;

// 	var d7 = board[0][0] == 2 && board[1][1] == 2 && board[2][2] == 2;
// 	var d8 = board[0][2] == 2 && board[1][1] == 2 && board[0][2] == 2;

// 	if(c1||c2||c3||c4||c5||c6||c7||c8) return 1;
// 	if(d1||d2||d3||d4||d5||d6||d7||d8) return -1;
// 	return 0;

// }




nextBoard = function(board,myTurn){
	// d(board);
	var winState = win(board)
	if(winState) return winState;

	var emptyMoves = engine.getEmptyMoves(board);

	var val = myTurn ? 1 : 2;

	var pick = myTurn ? pickMax : pickMin;

	var boards = [];
	var scores = [];

	for(var move in emptyMoves){

		var row = emptyMoves[move][0];
		var col = emptyMoves[move][1];

		var newBoard = clone(board);

		newBoard[row][col] = val;

		// var newScore = win(newBoard);

		
		// boards.push(nextBoard(board,!myTurn));
		var newScore = nextBoard(newBoard,!myTurn);

		scores.push(newScore);
		boards.push(newBoard);
		d(newBoard);
		console.log("score: "+newScore);

	}

	console.log(boards);
	console.log(scores);
	var picked = pick(boards,scores);

	console.log("I pick:");
	// console.log(picked[0]);
	d(picked[0]);

	choice = picked[0]
	return picked[1];
}

pickMin = function(moves,scores){

	var min = 0;
	var index = 0;

	for(var i in scores){
		if(scores[i] < min){
			min = scores[i];
			index = i;
		}
		// min = scores[i] < min ? scores[i] : min;
	}

	return [moves[index],scores[index]];
}

pickMax = function(moves,scores){

	var max = 0;
	var index = 0;

	for(var i in scores){
		if(scores[i] > max){
			max = scores[i];
			index = i;
		}
	}

	return [moves[index],scores[index]];
}

clone = function(board){
	var clone = [];
	for (var row = 0; row<3; row++){
		var newRow = [];
		for(var col = 0; col<3; col++){
			newRow.push(board[row][col]);
		}
		clone.push(newRow);
	}
	return clone;
}

var choice = [];

minimax = function(board){

	if(win(board)) return win(board);

	var scores = [];
	var moves = [];

	var em = engine.getEmptyMoves(board);
	//populate the scores array:
	for(var m in em){

		var r = em[m][0];
		var c = em[m][1];

		var newBoard = clone(board);

		scores.push(minimax(newBoard));
		moves.push(em[m]);

	}

	var pick = myTurn ? pickMax : pickMin;

	var picked = pick(moves,scores);

	choice = picked[0];

	return picked[1]; 

}

