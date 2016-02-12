/*

FCC:

"Sum all the prime numbers up to and including the provided number.

A prime number is defined as having only two divisors, 1 and itself. 
For example, 2 is a prime number because it's only divisible by 1 and 2. 
1 isn't a prime number, because it's only divisible by itself.

The provided number may not be a prime."

*/


// Divided in two functions:

// 1 isPrime:

function isPrime(num){
  
  // return first cases:
  if(num==2){return true;}
  if(num==1){return false;}
  // remove even numbers:
  if(num%2 == 0){return false;}

  //start checkin from 3:
  var j = 3;
  
  //loop until num:
  while(j<num){
    
    // as soon as a divider is found, return false
    if(num%j == 0){
      return false;
    }
    //even numbers were already returned
    j+=2;
  }
  
  // if no divider has been found from 1 < X < NUM, then NUM is a prime
  return true;

}


// 2 sumPrimes:

function sumPrimes(num) {
 
  var res = 0;
  var j = 0;
  while(j<=num){

    res += isPrime(j) ? j : 0;

    j++;
  }
  return res;
}

