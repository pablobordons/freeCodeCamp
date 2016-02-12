/*

FCC:

"Return an English translated sentence of the passed binary string.

The binary string will be space separated." <- spaces are passed as binary as well (00100000)

*/

function binaryAgent(str) {

  // 1 turn the string into an array
  arr = str.split(" ");
  
  // 2 change every element in the array for the char it represents
  for(var i in arr){
    arr[i] = String.fromCharCode(parseInt(arr[i],2));
  }
  
  // 3 return the array joined as a string
  return arr.join("");
}
