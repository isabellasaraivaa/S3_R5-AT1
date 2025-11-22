const{ produtosModel } = require("../models/produtosModel"); 
/*
------------------
listar todos os produtos
get /produtos
//------------------
*/

const produtosController ={ 
    listarProdutos: async (req, res)=>{ // listar todos os produtos
        try {
            const produtos = await produtosModel.buscarTodos(); // busca todos os produtos

            res.status(200).json(produtos); //retorna a lista de produtos

        }catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ error: 'Erro ao listar produtos'});
        }    
            
            
    },
    
    atualizarProduto: async (req, res) => { //atualizar produto
        try {
            const { idProduto } = req.params; //pega o id do produto
            const {nomeProduto, precoProduto} = req.body; //pega os dados do produto

            if(idProduto.length != 36) { //validação do idProduto
                return res.status(400).json({erro: 'id do produto é inválido!'}); 
            }

            const produto = await produtosModel.buscarUm(idProduto); //busca o produto pelo id

            if (!produto || produto.length !==1) { //validação se o produto existe
                return res.status(404).json({erro: 'Produto não encontrado!'}); // entrega o erro 404
            }
        
            const produtoAtual = produto[0]; //pega o produto atual

            const nomeAtualizado = nomeProduto ?? nomeProduto.  
            produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? precoAtual.
            precoProduto; //se não for nulo pega o preço atualizado se for nulo pega o preço atual

            await produtosModel.atualizarProduto(idProduto, nomeAtualizado, 
            precoAtualizado); //atualiza o produto 

            res.status(200).json({message: "Produto atualizado com sucesso!"}); //retorna a mensagem de sucesso
    
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({erro: 'Erro interno no servidor ao atualizar o produto!'}); //retorna o erro 500
        }
    },

    deletarProduto: async (req, res) => { //deletar produto
        try {
            const { idProduto } = req.params; //pega o id do produto
            
            //Validação do idProduto
            if(idProduto.length != 36) { //executa o código em seu interior ({...}) somente se o comprimento (número de caracteres) da variável idProduto for diferente de 36.
                return res.status(400).json({erro: 'id do produto é inválido!'}); //entrega o erro 400
            }

            const produto = await produtosModel.buscarUm(idProduto);//busca o produto pelo id

            if (!produto || produto.length !==1) { //validação se o produto existe 
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }
            await produtosModel.deletarProduto(idProduto); //deleta o produto

            res.status(200).json({message: 'Produto deletado com sucesso!'}); //retorna a mensagem de sucesso
        
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
  criarProduto: async (req, res)=>{ //criar um novo produto
    try {
        const {nomeProduto, PrecoProduto} = req.body; //pega os dados do produto

        if (nomeProduto == undefined || PrecoProduto == undefined || isNaN(PrecoProduto)) { //validação dos dados
            return res.status(400).json({erro: 'Campos Obrigatórios não preenchidos!'});
        }

        await produtosModel.inserirProduto(nomeProduto, PrecoProduto); //insere o produto no banco de dados

        res.status(201).json({message: 'Produto cadastrado com sucesso!'}); //retorna a mensagem de sucesso

    } catch (error) { //
        console.error('Erro ao cadastrar produto:',error);
        res.status(500).json({erro: 'Erro ao cadastrar produto.'});
    }
 } 
}

module.exports = {produtosController};