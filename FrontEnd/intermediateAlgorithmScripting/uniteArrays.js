/*

FCC:

"Write a function that takes two or more arrays 
and returns a new array of unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included in their original order, 
but with no duplicates in the final array.

The unique numbers should be sorted by their original order, 
but the final array should not be sorted in numerical order."

*/


function unite(arr1, arr2, arr3) {
  res = [];
  //Loop through the arguments
  for (var i in arguments){
    //Loop through every element in the arguments (arrays):
    for(var j in arguments[i]){
      //If the element of the argument is not in the result array, push it to the res array
      if(res.indexOf(arguments[i][j])<0){
        res.push(arguments[i][j]);
      }
    }    
  }
  return res;
}
