const { clientesModel } = require("../models/clienteModel");

//Busca de todos os clientes 
const clientesController ={
    listarClientes: async (req, res)=>{
        try {
            const clientes = await clientesModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ error: 'Erro ao listar clietes'});
        }
    },

    //Criação de um novo cliente com verificação de cpf 
    criarClientes: async (req, res) =>{
        try {
            const { nomeCliente, cpfCliente} = req.body;
            
            if (!nomeCliente || !cpfCliente) {
                return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
            }
          
          await clientesModel.inserirCliente(nomeCliente, cpfCliente)
          res.status(201).json({
            message: 'Cliente criado com sucesso'
          });
        } catch (error) {
            console.error('Erro:' , error)
            console.error({ error:'Erro ao criar clientes'});
            
        }
    
    }
}
module.exports = {clientesController};