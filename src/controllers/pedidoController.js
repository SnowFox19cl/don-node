//funciones completadas

// los datos se guardan en modules
const pedidoModel = require('../modules/pedidoModules');

// -> Contar cuántos ingredientes fueron seleccionados
function contar(ingredientes) {
    return ingredientes.length;
};

// -> Calcular ingredientes extra: los que superen los 3 incluidos en el precio base
function calcularIngredientes(ingredientes) {
    const INCLUIDOS = 3;
    const total = contar(ingredientes);
    const extra = total - INCLUIDOS;
    return extra > 0 ? extra : 0;
};

// -> Calcular precio base del tamaño + (ingredientes extra × valor extra del tamaño)
function calcularPrecioUnitario(ingredientes, tamaño) {
    const extra = calcularIngredientes(ingredientes);
    const precioFinal = tamaño.precioBase + (extra * tamaño.valorExtra);
    return precioFinal;
};

// -> Calcular precio unitario × cantidad
function totalPedido(ingredientes, tamaño, cantidad) {
    const precioUnitario = calcularPrecioU(ingredientes, tamaño);
    return precioUnitario * cantidad;
};

// -> registrar pedidos
function registrar(req, res) {                              
    const { nombre, tamaño, ingredientes } = req.body;    

    if (!nombre || !tamaño || !ingredientes) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const pedidosModel = require('../modules/pedidoModules');

    const nuevoRegistro = pedidosModel.create({            
        nombre,
        tamaño,
        ingredientes
    });

    nuevoRegistro
        .then(pedido => {
            res.status(201).json({                        
                mensaje: 'Pedido registrado con éxito',
                data: pedido
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ mensaje: 'Error al registrar el pedido' }); 
        });
}

// -> crear tabla de pedidos
function listar(req, res) {
    const pedidosModel = require('../modules/pedidoModules'); 

    pedidosModel.findAll()  
        .then(pedidos => {
            const filas = pedidos.map(n =>  
                `<tr>                          
                    <td>${n.tamaño}</td>        
                    <td>${n.ingredientes}</td> 
                </tr>`                         
            ).join('');                       

            res.send(`                         
                <table>
                    ${filas}
                </table>
            `);                                
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al obtener pedidos'); 
        });
}

module.exports = { contar, calcularIngredientes, calcularPrecioUnitario, totalPedido, listar, registrar};