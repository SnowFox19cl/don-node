const PedidoModel = require('../modules/pedidoModules');

const PRECIOS = {
    Chica: { base: 3990, extra: 500 },
    Mediana: { base: 5990, extra: 800 },
    Grande: { base: 8490, extra: 1200 }
};

exports.getFormulario = (req, res) => {
    res.render('index'); 
};

exports.registrarPedido = (req, res) => {
    const { nombre, tamaño, ingredientes, cantidad } = req.body;
    
    
    const listaIngredientes = Array.isArray(ingredientes) ? ingredientes : [ingredientes];
    const numIngredientes = listaIngredientes.length;
    
    
    const extras = Math.max(0, numIngredientes - 3);
    const precioUnitario = PRECIOS[tamaño].base + (extras * PRECIOS[tamaño].extra);
    const totalPedido = precioUnitario * parseInt(cantidad);

    const nuevoPedido = {
        nombre,
        tamaño,
        ingredientes: listaIngredientes.join(', '),
        precioUnitario,
        cantidad,
        totalPedido
    };

    PedidoModel.save(nuevoPedido);
    res.redirect('/pedidos');
};

exports.listarPedidos = (req, res) => {
    const pedidos = PedidoModel.getAll();
    const totalAcumulado = pedidos.reduce((sum, p) => sum + p.totalPedido, 0);
    res.render('lista', { pedidos, totalAcumulado });
};

