function add(x,y){
    return x+y;
}

function substract(x,y){
    return x-y;
}
function multiply(x,y){
    return x*y;
}
function divide(x,y){
    if(y==0)
    {
        console.log('No se puede dividir entre 0')
    }
    else{
        return x/y;
    }

}

exports.add=add;
exports.substract=substract;
exports.multiply=multiply;
exports.divide=divide;