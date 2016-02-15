/*

FCC:

"Repeat a given string (first argument) num times (second argument). 
Return an empty string if num is a negative number."

*/


function repeat(str, num) {
  // repeat after me
  res = "";
  for(var i = 0; i<num; i++){
    res+=str;
  }
  return res;
}
