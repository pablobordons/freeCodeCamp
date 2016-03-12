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

var moves = [[0,1],[1,1]];

var scores = [0,-1];

debug(pickMin(moves,scores)[0]);


// how to change it dynamically

ia = {};

ia.turn = false;

var pick = ia.turn ? pickMin : pickMax;
