function flattenArray(arr){
        
    return arr.reduce(function(valorAnterior, valorActual){
        if(!Array.isArray(valorActual)){
        return valorAnterior.concat(valorActual);
        }
        return valorAnterior.concat(steamroller(valorActual));
        
        
    },[]); 
    
}
