const{ produtosModel } = require("../models/produtosModel"); 
/*
------------------
listar todos os produtos
get /produtos
//------------------
*/

const produtosController ={
    listarProdutos: async (req, res)=>{
        try {
            const produtos = await produtosModel.buscarTodos();

            res.status(200).json(produtos);

        }catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ error: 'Erro ao listar produtos'});
        }    
            
            
    }
}

module.exports = {produtosController};