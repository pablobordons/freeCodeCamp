/*

FCC:

"Drop the elements of an array (first argument), 
starting from the front, until the predicate (second argument) returns true.

Return the rest of the array, otherwise return an empty array."

*/

function drop(arr, func) {
  
  //the index to show how much cut from the array
  var j = 0;
  for(var i = 0; i < arr.length; i++){
  
    //if the condition is satisfied, keep iterating
    if(!func(arr[i])){
      j++;
    }
    // if the condition is not satisfy, break the loop
    else{
      break;
    }
  }
  
  // return the sliced array (until the index)
  return arr.slice(j);
}
