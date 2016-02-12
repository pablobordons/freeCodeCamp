/*

FCC:

"Return the sum of all odd Fibonacci numbers 
up to and including the passed number if it is a Fibonacci number.

The first few numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8, 
and each subsequent number is the sum of the previous two numbers.

As an example, passing 4 to the function should return 5 
because all the odd Fibonacci numbers under 4 are 1, 1, and 3."

*/


function sumFibs(num) {
  //arr to store the fibonacci number up until num
  var fibNum = [1,1];
  //arr to store the sum. It starts in 2 because the first two odd fibonacci numbers are 1 and 1
  var oddSum = 2;
  // variable to store the new term in the serie
  var newTerm = 0;
  
  // starting from the second element, add the fibonacci numbers until the new term to add greter than num
  // "=" is added to the condition so if num is a fibonacci number, it'll be included as well
  for(var i = 2; fibNum[fibNum.length - 1] + fibNum[fibNum.length - 2] <= num ;  i++){
    newTerm = fibNum[i-1]+fibNum[i-2];
    fibNum.push(newTerm);
    
    // if the new term is odd, then add it to the oddSum
    if(newTerm%2 != 0){
      oddSum+=newTerm;
    }
  }
  
  
  return oddSum;
}
