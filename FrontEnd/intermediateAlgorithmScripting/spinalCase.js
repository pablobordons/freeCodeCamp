/*

FCC: 

"Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes."

*/

function spinalCase(str) {

  // /([a-z])([A-Z])/g,"$1 $2"  replace all ocurrences "aA" with "a A"
  
  // then lowerCase everything, split by spaces or "_" and join everything back with "-"
  
  return str.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().split(/\ |\_/gi).join("-");
}
