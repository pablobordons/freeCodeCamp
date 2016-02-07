/*

FCC:

"Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined."

*/

function fearNotLetter(str) {
  var arr=str.split("");

  for(var i = 0; i<arr.length - 1;i++){
    //if the letter at i is not the same as the letter at i+1 minus 1 (c-1=b):
    if(arr[i].charCodeAt() != parseInt(arr[i+1].charCodeAt()-1)){
      //then return the letter at i plus one space (a+1=b). 
      //ParseInt is necessary because String.charCode return a string and then 1 + 1 = 11
      return   String.fromCharCode(parseInt(arr[i].charCodeAt()+1));
    }
  }
}

// EXTRA:
// The exended function return any letter between X and Y where X is the first letter in the array and Y is the last one.
// letters don't need to be in order.


function fearNotLetterExtra(str) {
  var arr=str.split("").sort();
  var missing = [];

  for(var i = 0; i<arr.length - 1;i++){
	
  	if(arr[i].charCodeAt() != parseInt(arr[i+1].charCodeAt()-1)){
  		missing.push(String.fromCharCode(parseInt(arr[i].charCodeAt()+1)));
  		
  		//Like the last version, 
  	  //but instead of returning the letter, add that letter to the original array and keep iterating.
  		arr.splice(i+1,0,String.fromCharCode(parseInt(arr[i].charCodeAt()+1)));
  		
  	}
  }
  return missing.join("");
}
