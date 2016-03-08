
//////////////////////////
/////////////////////////
//////
/////
////      Tic Tac Toe
///
//





var engine = {

	// player : "cross",

	// board : [[0,0,0],[0,0,0],[0,0,0]],

	// emptyMoves : [],

	start : function(player){

		engine.setPlayer(player);
		display.loadBoard();
		engine.getEmptyMoves();

	},

	getEmptyMoves : function(){

		var emptyMoves = [];

		for(var row = 0; row < 3; row++){

			for(var col = 0; col<3; col++){

				if(!engine.board[row][col]){
					emptyMoves.push([row,col]);
				}
			}
		}

		engine.emptyMoves = emptyMoves;

	},

	win : function (board) {

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
						break;
					case "circle":
						$(this).html(display.moves.circle);
						break;

				}

				display.loadBoard();

				engine.getEmptyMoves();

				ia.move();
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

		display.printBoard();

	}


};

