//importar a conexao com o banco de dados e tipos de dados SQL
const { sql, getConnection } = require("../config/db");

const produtosModel = {        // criando objeto javascript
    buscarTodos: async () => {   //buscar todos os atributos
        try { //tratamento de erro

            const pool = await getConnection(); //conexão com o banco de dados 

            let querySQL = "SELECT * FROM Produtos";   //query quer dizer consulta

            const result = await pool.request().query(querySQL);

            return result.recordset;   //retorna a lista de produtos

        } catch (error) {
            console.error("Error ao buscar produtos:", error);
            throw error;   //caso der erro ele que recebera a informacao
        }
    },
    buscarUm: async (idProduto) => { // buscar um produto pelo id
        try {
            const pool = await getConnection(); //conexão com o banco de dados

            const querySQL = 'SELECT * FROM Produtos WHERE idProduto = @idProduto'; // consulta SQL para buscar o produto pelo id

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto) //evita SQL injection
                .query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar o produto', error);
            throw error;
        }

    },

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => { // atualizar produto
        try {
            const pool = await getConnection();

            //EVITA SQL INJECTION 
            const querySQL = `
           UPDATE Produtos
           SET nomeProdutos = @nomeProduto, 
             precoProduto = @precoProduto
         WHERE idProduto = @idProduto
         `
            await pool.request()
                .input('nomeProduto', sqlVarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2),
                    precoProduto)
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    },

    deletarProduto: async (idProduto) => { // deletar produto
        try {
            const pool = await getConnection(); // conexão com o banco 

            const querySQL = ` // query de deletar
              DELETE FROM Produtos 
              WHERE idProduto = @idProduto // evite sql injection
              `

            await pool.request() //executa a query
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw error;

        }
    },


    inserirProduto: async (nomeProduto, precoProduto) => { // inserir produto
        try {

            const pool = await getConnection(); // conexão com o banco 

            let querySQL = 'INSERT INTO Produtos (nomeProduto, precoProduto) VALUES (@nomeProduto, @precoProduto)'; // query de inserção

            await pool.request() // executa a query
                .input('nomeProduto', sql.VarChar(100),
                    nomeProduto) 
                .input('precoProduto', sql.Decimal(10, 2),
                    precoProduto) // evite SQL injection
                .query(querySQL); // executa a query

        } catch (error) {
            console.error('Erro ao inserir produtos:', error);
            throw error;
        }
    }
};
// (async ()=>{
//     const produtos = await produtosModel.buscarTodos();
//     console.log(produtos);
// })();

module.exports = { produtosModel }