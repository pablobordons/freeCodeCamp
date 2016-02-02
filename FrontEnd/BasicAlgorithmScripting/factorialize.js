function factorialize(num) {
  var res=1;
  for (var i = 1; i<num+1;i++){
    res*=i;
  }
  
  return res;
}
