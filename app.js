const express = require('express')
const app = express()
const { produtoRoutes } = require("./src/routes/produtosRoutes")
const { clientesRouter } = require('./src/routes/clientesRoutes')

const PORT = 8081

app.use(express.json())

//configurar as rotas da aplicaçao
app.use('/', produtoRoutes)// busca todas as routes que tem produtos routes 
app.use('/', clientesRouter)

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
});