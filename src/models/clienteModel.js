const { pool } = require("mssql");
const { sql, getConnection } = require("../config/db"); //importação 

const clientesModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            let query = "SELECT * FROM Clientes"; //consulta de clientes 

            const result = await pool.request().query(query); // Executa a query SQL que seleciona todos os registros da tabela

            return result.recordset; //retorna a lista de clientes 

        } catch (error) {
            console.error("Erro ao buscar Clientes", error);
            throw error; //caso der erro ele recebera a informação 
        }

    },

    buscarPorEmail: async (emailCliente) => {
        try {
            const pool = await getConnection();

            let query = "SELECT * FROM Clientes WHERE emailCliente = @emailCliente"; //consulta de clientes 

            const result = await pool
            .request()
            .input('emailCliente', sql.VarChar(200), emailCliente)
            .query(querySQL); // Executa a query SQL que seleciona todos os registros da tabela

            return result.recordset; //retorna a lista de clientes 

        } catch (error) {
            console.error("Erro ao buscar Clientes", error);
            throw error; //caso der erro ele recebera a informação 
        }

    },
    buscarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection();

            let query = "SELECT * FROM Clientes  WHERE cpfCliente = @cpfCliente"; //consulta de clientes

            const result = await pool
            .request()
            .input('cpfCliente', sql.VarChar(14), cpfCliente)
            .query(querySQL); // Executa a query SQL que seleciona todos os registros da tabela

            return result.recordset; //retorna a lista de clientes 

        } catch (error) {
            console.error("Erro ao buscar Clientes", error);
            throw error; //caso der erro ele recebera a informação 
        }

    },



    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {
        try {
            const pool = await getConnection();

            let query = 'INSERT INTO Clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)';

            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .input('emailCliente', sql.VarChar(150), emailCliente)
                .input('senhaCliente', sql.VarChar(255), senhaCliente)
                .query(query);

        } catch (error) {
            console.error('Erro ao inserir cliente:', error);
            throw error;
        }
    }
};


module.exports = {
    clientesModel
};