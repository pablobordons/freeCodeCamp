/*

FCC:

"Create a function that looks through an array (first argument) 
and returns the first element in the array that passes a truth test (second argument)."

*/

function find(arr, func) {
  //return only the first element of the filtered array
  return arr.filter(func)[0];
  
}
