const express = require('express'); // importação do express
require('dotenv').config(); // importação do dotenv para variaveis de ambiente 
const app = express() // criando a aplicação express
const { produtoRoutes } = require("./src/routes/produtosRoutes") 
const { clientesRouter } = require('./src/routes/clientesRoutes')

const PORT = process.env.PORT // definindo a porta da aplicação

app.use(express.json())

//configurar as rotas da aplicaçao
app.use('/', produtoRoutes)// busca todas as routes que tem produtos routes 
app.use('/', clientesRouter)

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
});