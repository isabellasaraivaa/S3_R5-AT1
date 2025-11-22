const { clientesModel } = require("../models/clienteModel");
const bcrypt = require('bcrypt');

//Busca de todos os clientes 
const clientesController ={
    listarClientes: async (req, res)=>{
        try {
            const clientes = await clientesModel.buscarTodos(); // busca todos os clientes

            res.status(200).json(clientes); //retorna a lista de clientes

        } catch (error) { //tratamento de erro
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ error: 'Erro ao listar clietes'}); 
        }
    },

    //Criação de um novo cliente com verificação de cpf 
    criarClientes: async (req, res) =>{
        try {
            const { nomeCliente, cpfCliente, emailCliente, senhaCliente} = req.body; //dados do cliente
            
            if (!nomeCliente || !cpfCliente || !emailCliente || !senhaCliente) { //validação dos dados
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }
          
            //Criptografar a senha do cliente
            const saltRounds =10; // número de rounds de salt
            const senhaCriptografada = await bcrypt.hash(senhaCliente, saltRounds); //criptografia da senha

            
          await clientesModel.inserirCliente(nomeCliente, cpfCliente, emailCliente, senhaCriptografada); //insere o cliente no banco de dados
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