//importar a conexao com o banco de dados e tipos de dados SQL
const {sql, getConnection} = require("../config/db");

const produtosModel = {        // criando objeto javascript
    buscarTodos: async ()=>{   //buscar todos os atributos
        try {
            
            const pool = await getConnection();
            
            let querySQL = "SELECT * FROM Produtos";   //query quer dizer consulta

            const result = await pool.request().query(querySQL);

            return result.recordset;   //retorna a lista de produtos

        } catch (error) {
            console.error("Error ao buscar produtos:",error);
            throw error;   //caso der erro ele que recebera a informacao
        }
    }
};

// (async ()=>{
//     const produtos = await produtosModel.buscarTodos();
//     console.log(produtos);
// })();

module.exports = {produtosModel}