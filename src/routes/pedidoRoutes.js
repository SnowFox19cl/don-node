//rutas
const  Router  = require("express");                             
const PedidoController = require("../controllers/pedidoController") 

const router = Router();

router.get('/pedidos', PedidoController.registrarPedidos);


router.post('/pedido', PedidoController.listarPedidos);

module.exports = router; 