//rutas
const  Router  = require("express");                             
const PedidoController = require("../controllers/pedidoController") 

const router = Router();

// GET - obtener pedidos
router.get('/pedidos', PedidoController.registrar);

// POST - crear pedido
router.post('/pedido', PedidoController.listar);

module.exports = router; 