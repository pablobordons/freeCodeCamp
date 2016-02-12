/*

FCC:

"Find the smallest common multiple of the provided parameters 
that can be evenly divided by both, 
as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

e.g. for 1 and 3 - 
find the smallest common multiple of both 
1 and 3 that is evenly divisible by all numbers between 1 and 3."

*/

// finds out if every element in an array is divisible by a given number
function divisibleByAll(num,arr){

  for (var j = arr[0];j<=arr[1];j++){

    if(num%j!==0){
      return false;
    }
  }
  return true;
}

// use divisibleByAll in every element in a range:
function smallestCommons(arr) {
  arr.sort(function(a,b){return a-b;});

  var j = 1;
  //infinite loop that return the first number than can be divided by every element in the array
  while(true){
    if(divisibleByAll(j,arr)){
      return j;
    }
    j++;
  }
}


