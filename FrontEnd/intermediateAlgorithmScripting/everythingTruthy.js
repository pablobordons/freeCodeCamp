/*

FCC:

"Check if the predicate (second argument) is truthy on all elements of a collection (first argument)."

*/


function every(collection, pre) {
 
  for(var i in collection){
    if(collection[i][pre] == undefined){return false;}
    else if(collection[i][pre] == ""){return false;}
    else if(collection[i][pre].toString() == collection[i][pre]){}
    else if(isNaN(collection[i][pre])){return false;}
  }
  
  return true;
}
