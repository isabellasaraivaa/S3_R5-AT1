const express = require('express');
require('dotenv').config();
const app = express()
const { produtoRoutes } = require("./src/routes/produtosRoutes")
const { clientesRouter } = require('./src/routes/clientesRoutes')

const PORT = process.env.PORT

app.use(express.json())

//configurar as rotas da aplicaçao
app.use('/', produtoRoutes)// busca todas as routes que tem produtos routes 
app.use('/', clientesRouter)

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
});