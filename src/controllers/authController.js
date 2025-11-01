const { clientesModel } = require("../models/clienteModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    clienteLogin: async (req, res) => {
        try {
            const { emailCliente, senhaCliente } = req.body;

            if (emailCliente == undefined || senhaCliente == undefined) {
                return res.status(400).json({ error: "Email e senha são obrigatórios"});
            }
            
            const result = await clientesModel.buscarPorEmail(emailCliente);

            if (result.length ===0) {
                return res.status(401).json({ error: "Email ou senha não encontrados"});
            }

            const cliente = result[0];

            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);

            if ( !senhaValida ) {
                return res.status(401).json({ error: "Credenciais inválidas"});
            }
            const payLoad = {
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario:  'cliente'
            };
            
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
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