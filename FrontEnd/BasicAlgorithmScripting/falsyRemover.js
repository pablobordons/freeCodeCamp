/*

FCC:

"Remove all falsy values from an array.

Falsy values in JavaScript are false, null, 0, "", undefined, and NaN."

*/


function bouncer(arr) {
  arr = arr.filter(function(a){
    
    if(isNaN(a) && typeof a !== "string"){
		return 0;
    }

    switch (a){
      case 0:
      case undefined:
      case false:
      case "":
      case null:
        return 0;
    }
    return 1;    
  }); 
  
  return arr;
}

