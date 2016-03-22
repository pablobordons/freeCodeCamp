function flattenArray(arr){
        
    return arr.reduce(function(valorAnterior, valorActual){
        if(!Array.isArray(valorActual)){
        return valorAnterior.concat(valorActual);
        }
        return valorAnterior.concat(steamroller(valorActual));
        
        
    },[]); 
    
}


/*  Shorter version */
/*(Pablo Macías from Gitter)*/


function steamroller(arr){
  return arr.reduce((ant, act) => {
    return Array.isArray(act) ? ant.concat(steamroller(act)) : ant.concat(act);
  }, []);
}
