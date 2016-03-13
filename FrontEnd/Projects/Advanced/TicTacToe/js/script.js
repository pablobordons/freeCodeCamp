/*

This file shares code with tools.js

This needs to be formatted

*/



//////////////////////////
/////////////////////////
//////
/////
////      Tic Tac Toe
///
//





var engine = {

	start : function(player){

		engine.setPlayer(player);
		display.loadBoard();
		engine.getEmptyMoves();

	},

	getEmptyMoves : function(board){
		var def = false;
		if(board == undefined) {
			board = engine.board;
			def = true;
		}

		var emptyMoves = [];

		for(var row = 0; row < 3; row++){

			for(var col = 0; col<3; col++){

				if(!engine.board[row][col]){
					emptyMoves.push([row,col]);
				}
			}
		}

		if(def){engine.emptyMoves = emptyMoves;}
		else {return emptyMoves;}

	},

	win : function (board) {

	  if(board == undefined){board = engine.board}
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
	    //console.log(arr[i]);
	    if(engine.tools.evaluateRow(arr[i])) {
	      return engine.tools.evaluateRow(arr[i])
	      };
	  }
	 
	  //check if there're spaces left:
	  if(engine.tools.findInMatrix(board,0)) return -1;

	  return 0;

	},

	tools : {

		debug : function(board){
			if(board == undefined) {board = engine.board;}
			// returns a readable board:
			var readableBoard = "\n";
			for(var row = 0; row<3;row++){

				readableBoard += "|";
				readableBoard += board[row].join("|").replace(/2/g,"O").replace(/1/g,"X").replace(/0/g," ");
				readableBoard += "|\n";

			}
			return readableBoard;

		},

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

	},

	setPlayer : function(player){

		engine.player = player;

		ia.player = player == "cross" ? "circle" : "cross";
	}

};

var display = {

	board : (function(){

		var board = [];

		for(var row = 1; row < 4; row++){

			var newRow = [];

			for(var col = 1; col < 4; col++){

				var move = $(".row:nth-child("+row+") .square:nth-child("+col+")");

				newRow.push(move);

			}

			board.push(newRow);

		}

		return board;

	})(),

	moves : {

		cross : '<div class="move move-cross"><i class="fa fa-times"></i></div>',

		circle : '<div class="move move-circle"><i class="fa fa-circle-o"></i></div>',

		empty : '<div class="move move-empty"></div>'

	},

	printBoard : function(){

		for(var row in this.board){
			for(var col in this.board[row]){

				var move 
				switch(engine.board[row][col]){
					case 0:
						move = '<div class="move move-empty"></div>';
						break;
					case 1:
						move = '<div class="move move-cross"><i class="fa fa-times"></i></div>';
						break;
					case 2:
						move = '<div class="move move-circle"><i class="fa fa-circle-o"></i></div>';
						break;
					default:
						console.log("error in board");
						break;
				}

				this.board[row][col].html(move);
			}
		}
	},

	loadBoard : function(){

		var newBoard = [];

		for(var row = 0; row < 3 ; row++){

			var newRow = [];

			for(var col = 0; col < 3 ; col++){

				var move = display.board[row][col].children();

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
		console.log(newBoard)
		engine.board = newBoard;

	},

	buttons : {

		board : $(".square"),

		enter : $(".square").mouseenter(function(){
			// console.log("hover");
			var move = engine.player == "cross" 
					 ? display.moves.cross 
					 : engine.player == "circle" ? display.moves.circle : "";

			if($(this).children().hasClass("move-empty")){
				// console.log("if");
				$(this).children().html(move).addClass("move-hover");
			}

		}),

		leaves : $(".square").mouseleave(function(){
			// console.log("hover");
			if($(this).children().hasClass("move-hover")){
				// console.log("if");
				$(this).html(display.moves.empty).removeClass("move-hover");
			}

		})

	},

	logic : {

		board : function(){
			console.log($(this));
			if($(this).children().hasClass("move-empty")){

				switch(engine.player){

					case "cross":
						$(this).html(display.moves.cross);
						engine.player = "circle";
						break;
					case "circle":
						$(this).html(display.moves.circle);
						engine.player = "cross";
						break;

				}

				display.loadBoard();

				engine.getEmptyMoves();

				//ia.move();
			}
			else{
				console.log("occupied");
			}


		}
	}

};

display.control = {

	board : display.buttons.board.click(display.logic.board)

}

var ia = {

	turn : false,

	perfectMove : function(board,player){


		if(player != "cross" && player != "circle") return console.log("error");

		var moves = engine.emptyMoves;
		
		var perfectRow;
		var perfectCol;


	},

	testMove : function(move,player){

		var testingElement = player == "cross" ? 1 : 2;

		var testingRow = move[0];
		var testingCol = move[1];

		var testingBoard = engine.board;

		testingBoard[testingRow][testingCol] = testingElement;

		console.log(engine.win(testingBoard) == testingElement);
	},

	move : function(){

		var newElement = ia.player == "cross" ? 1 : 2;

		var row = engine.emptyMoves[0][0];
		var col = engine.emptyMoves[0][1];

		engine.board[row][col] = newElement;
		engine.getEmptyMoves();
		display.printBoard();

	},

	minimax : function(board){

		if(board == undefined) {board = engine.board;}

		ia.turn = !ia.turn;

		var lookingFor = ia.turn ? 2 : 1;

		var enemy = ia.turn ? 1 : 2;

		var newMove = lookingFor;

		var emptyMoves = engine.getEmptyMoves(board);

		var turn = 10 - emptyMoves.length;

		console.log("turn #"+turn);

		for(var move in emptyMoves){

			var row = emptyMoves[move][0];
			var col = emptyMoves[move][1];

			board[row][col] = newMove;

			console.log(engine.tools.debug(board));

			// switch(engine.win(board)){

			// 	case lookingFor:
			// 		console.log("WIN");
			// 		break;
			// 	case enemy:
			// 		console.log("LOSE");
			// 		break;
			// 	case 0:
			// 		console.log("tie");
			// 		break;
			// 	case -1:
			// 		console.log("keep looking");
			// 		ia.minimax(board);
			// 		break;

			// }


		}




	}


};


engine.start("circle");
engine.board = [[1,0,2],[2,0,0],[2,1,1]];
engine.board = [[0,0,0],[2,0,2],[1,1,0]];
display.printBoard();
ia.turn = false;

// secondary functions looking for minimax:

// when i call minimax on a board, it should tell me where the circle wants to move.

// always going to be called in x turn (ia turn = false)



// minimax = function(board){
// 	//
// 	if(board == undefined) {
// 		board = engine.board;
// 	}

// 	// if(score == undefined){
// 	// 	score = 0;
// 	// }

// 	// change turn
// 	ia.turn = !ia.turn;

// 	// if ia's turn, add cirlce (2), else, add cross (1)
// 	var nmove = ia.turn ? 2 : 1;

// 	// in ia's turn, pick the min, else, pick the max
// 	var pick = ia.turn ? function(a,b){return Math.min(a,b);} : function(a,b){return Math.max(a,b);}
	
// 	// var scores;

// 	var emptyMoves = engine.getEmptyMoves(board);

// 	for(var move in emptyMoves){
// 		var row = emptyMoves[move][0];
// 		var col = emptyMoves[move][1];
		
// 		board[row][col] = nmove;
// 		console.log("\n\n___"+times+"______\n\n");
// 		console.log("empty moves: "+emptyMoves);	
// 		console.log(engine.tools.debug(board));
		
// 		console.log("move: "+row,col);
// 		console.log("score: "+win(board));
// 		if(!win(board)) minimax(board);
// 		board[row][col] = 0;
// 		times++;
// 		scores.push(win(board))
// 		// break;
// 	}

// 	console.log(scores);


// }

//asume player is cross
win = function(board){

	if(board == undefined) board = engine.board;

	var outcome = engine.win(board);

	if(outcome == 1) return -1;
	if(outcome == 2) return 1;
	return 0;

}

/////

/*

 evaluate a move


 win return 1
 lose return -1
 tie repeat


*/


// minimax = function(board,depth){
// 	// if(depth == undefined) depth = 0;
// 	depth = depth == undefined ? 1 : depth;
// 	console.log(depth);
// 	// change turn:
// 	ia.turn = !ia.turn;
// 	console.log("this is ia s turn: "+ia.turn);

// 	// chose move:
// 	var newMove = ia.turn ? 1 : 2;
// 	console.log("the new move will be: "+newMove);
// 	//first call in the original board:
// 	if(board == undefined) board = engine.board;

// 	// moves I'm going to try
// 	var emptyMoves = engine.getEmptyMoves(board);
// 	console.log("the moves to try are: "+emptyMoves);

// 	// moves i'm going to evaluate:
// 	var moves = [];
// 	// scores of those moves
// 	var scores = [];


// 	// for every move, give it a score
// 	// repeat until +-1 is reached, or move.length=0
// 	for(var move in emptyMoves){

// 		console.log("I'm evaluating the move: "+emptyMoves[move])

// 		var evaluatingBoard = board;

// 		var evaluatingRow = emptyMoves[move][0];
// 		var evaluatingCol = emptyMoves[move][1];

// 		evaluatingBoard[evaluatingRow][evaluatingCol] = newMove;

// 		console.log("the evaluating board is: "+engine.tools.debug(evaluatingBoard));

// 		var score = win(evaluatingBoard);
// 		console.log("the score is: "+score);
// 		// if score != 0, then push the score and stop looking for others (others will be equal or 0)
// 		if( score != 0 ){ 
// 			console.log("I'm pushing the score");
// 			scores.push(score); 
// 			console.log("I'm pushing the move");
// 			moves.push(emptyMoves[move]);

// 			break;
// 		}//end with that move
// 		else{ 
// 			console.log("I'm going to call minimax");
// 			depth ++;
// 			minimax(evaluatingBoard,depth); 
// 			// change turn
// 			console.log("I finished the secondary minimax");
// 			ia.turn = !ia.turn;
// 		}//repeat

// 		moves.push(emptyMoves[move]);
// 		scores.push(score);
// 		console.log("I finished evaluating the move: "+emptyMoves[move]);
// 		console.log("the moves"+moves);
// 		board[evaluatingRow][evaluatingCol] = 0;
// 	}

// 	// return the best board

// 	var pick = ia.turn ? pickMin : pickMax;
// 	console.log("depth is: "+depth);
// 	console.log("this is ia s turn: "+ia.turn);
// 	console.log("I'm going to pick among: "+moves);
// 	console.log("using"+pick)
// 	console.log("that have scores: " +scores);
// 	var bestMove = pick(moves,scores);
// 	console.log("And I picked "+bestMove);
// 	var bestRow = bestMove[0];
// 	var bestCol = bestMove[1];

// 	var bestBoard = board;

// 	bestBoard[bestRow][bestCol] = newMove;


// 	depth--;
// 	return bestBoard;

// }
// var choice = [];

// minimax = function(board){

// 	// it returns the score of the game if it's ended (1 or -1)
// 	if(!engine.win(board)) {console.log("hey");return engine.win(board);}

// 	var scores = [];
// 	var moves = [];

// 	var move = ia.turn ? 1 : 2;
// 	ia.turn = !ia.turn;

// 	pick = ia.turn ? pickMin : pickMax;

// 	var empty = engine.getEmptyMoves(board);

// 	for(var position in empty){
// 		console.log(empty[position]);
// 		var possibleBoard = newBoard(board,empty[position],move);
// 		var score = minimax(possibleBoard);
// 		console.log(score);
// 		scores.push(score);
// 		moves.push(empty[position]);
	
// 	}

// 	var best = pick(moves,scores);
	
// 	choice = best[0];
// 	console.log(best)
// 	return best[1];

// }

newBoard = function(board,position,move){

	board[position[0]][position[1]] = move; 

	return board;

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


// how to change it dynamically

ia = {};

ia.turn = false;

var pick = ia.turn ? pickMin : pickMax;



