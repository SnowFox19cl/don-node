const express = require('express')
const pedidoRoutes = require('./src/routes/pedidoRoutes') 

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())           

app.use('/pedidos', pedidoRoutes)               

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

// POST - crear pedido
app.post('/pedido', (req, res) => {
    const datos = req.body
    res.json({ mensaje: 'Pedido recibido', datos })
})

app.listen(PORT, () => {          
    console.log(`Servidor corriendo en puerto ${PORT}`)
})