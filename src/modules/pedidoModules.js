
let pedidos = []

function guardar (pizza){
    pedidos.push(pizza)
};

function mostrar(){
    return pedidos
};

module.exports = {guardar,mostrar}