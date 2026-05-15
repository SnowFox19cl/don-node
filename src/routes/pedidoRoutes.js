//rutas
const  Router  = require("express");                             
const PedidoController = require("../controllers/pedidoController") 

const router = Router();

// GET - obtener pedidos
router.get('/pedidos', PedidoController.registrarPedidos);

// POST - crear pedido
router.post('/pedido', PedidoController.listarPedidos);

module.exports = router; 