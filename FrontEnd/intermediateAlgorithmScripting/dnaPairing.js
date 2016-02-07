/*
FCC:

"The DNA strand is missing the pairing element. 
Take each character, get its pair, and return the results as a 2d array.

Base pairs are a pair of AT and CG. Match the missing element to the provided character.

Return the provided character as the first element in each array.

For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]

The character and its pair are paired up in an array, 
and all the arrays are grouped into one encapsulating array."

*/


function pair(str) {
  
  var arr = str.split("");
  var resArr = [];
  
  
  for (var i in arr){
    
    //Get the pair for each element:
  	var pair = 0;
  	switch(arr[i]){
  		case "G":
  			pair = "C";
  			break;
  		case "C":
  			pair = "G";
  			break;
  		case "T":
  			pair = "A";
  			break;
  		case "A":
  			pair = "T";
  			break;  			
  	}
    
    //push the subarray into the resuting array.
    //the subarray is composed by the original element and its paired one.
  	resArr.push([arr[i],pair]);

  }
  
  return resArr;
}
