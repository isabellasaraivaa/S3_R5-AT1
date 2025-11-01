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
            
            
    },
    
    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const {nomeProduto, precoProduto} = req.body;

            if(idProduto.length != 36) {
                return res.status(400).json({erro: 'id do produto é inválido!'});
            }

            const produto = await produtosModel.buscarUm(idProduto);

            if (!produto || produto.length !==1) {
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }
        
            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? nomeProduto.  
            produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? precoAtual.
            precoProduto;

            await produtosModel.atualizarProduto(idProduto, nomeAtualizado, 
            precoAtualizado);

            res.status(200).json({message: "Produto atualizado com sucesso!"});
    
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({erro: 'Erro interno no servidor ao atualizar o produto!'});
        }
    },

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            
            //Validação do idProduto
            if(idProduto.length != 36) {
                return res.status(400).json({erro: 'id do produto é inválido!'});
            }

            const produto = await produtosModel.buscarUm(idProduto);

            if (!produto || produto.length !==1) {
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }
            await produtosModel.deletarProduto(idProduto);

            res.status(200).json({message: 'Produto deletado com sucesso!'});
        
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
         res.status(500).json({erro: 'Erro interno no servidor ao deletar o Produto!'});
        }
    },


//criar um novo produto post /produtos
//BODY
//{
//"nomeProduto": "nome",
//"precoProduto": 0.00
//}
  criarProduto: async (req, res)=>{
    try {
        const {nomeProduto, PrecoProduto} = req.body;

        if (nomeProduto == undefined || PrecoProduto == undefined || isNaN(PrecoProduto)) {
            return res.status(400).json({erro: 'Campos Obrigatórios não preenchidos!'});
        }

        await produtosModel.inserirProduto(nomeProduto, PrecoProduto);

        res.status(201).json({message: 'Produto cadastrado com sucesso!'});

    } catch (error) {
        console.error('Erro ao cadastrar produto:',error);
        res.status(500).json({erro: 'Erro ao cadastrar produto.'});
    }
 } 
}

module.exports = {produtosController};