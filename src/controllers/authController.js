const { clientesModel } = require("../models/clienteModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = { // controller de autenticação
    clienteLogin: async (req, res) => { // login do cliente 
        try {
            const { emailCliente, senhaCliente } = req.body; // dados do cliente

            if (emailCliente == undefined || senhaCliente == undefined) { // validação dos dados 
                return res.status(400).json({ error: "Email e senha são obrigatórios"});
            }
            
            const result = await clientesModel.buscarPorEmail(emailCliente);

            if (result.length ===0) { // validação do email
                return res.status(401).json({ error: "Email ou senha não encontrados"});
            }

            const cliente = result[0]; // pega o cliente 

            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente); // validação de senha

            if ( !senhaValida ) { 
                return res.status(401).json({ error: "Credenciais inválidas"}); //senha invalida
            }
            const payLoad = { // criação di token 
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario:  'cliente'
            };
            
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, { // assinatura do token 
                expiresIn: process.env.JWT_SECRET_EXPIRES_IN
            });

            res.status(200).json({message: "Logado com sucesso!",
                 token
             })
        } catch (error) {
            console.error("Erro ao autenticar cliente", error);
            return res.status(500).json({ error: " Erro no servidor ao realizar login"});
        }
    }
};

module.exports = { authController};