/*

FCC:

"Create a function that sums two arguments together. 
If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, add(2, 3) should return 5, and add(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = add(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined."

*/



function add(){
  var original = arguments[0];
  
  //check if arguments are valid numbers;
  for (var j in arguments){
    //is string:
    if(arguments[j].toString() === arguments[j]){
      return undefined;
    }
    //is NaN or undefined:
    if(isNaN(arguments[j])){
      return undefined;
    }
    //is Array:
    if(Array.isArray(arguments[j])){
      return undefined;
    }
  }
  
  // check if there are two arguments:
  if(arguments.length ==2){
    //return the sum
    return arguments[0]+arguments[1];
  }
  // if there aren't two arguments, return a function that add the previous argument 
  // to the new argument: add(original)(new) = original + new
  else{
    return function(a){
      
        //check if the arguments are valid numbers:
        for (var j in arguments){
          // is string:
          if(arguments[j].toString() === arguments[j]){
            return undefined;
          }
          //is NaN or undefined
          if(isNaN(arguments[j])){
            return undefined;
          }
          //is Array:
          if(Array.isArray(arguments[j])){
            return undefined;
          }
        }
        
        return a + original;
      };
  }
}
