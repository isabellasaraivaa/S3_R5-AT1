const express = require("express");
const router = express.Router();
const {clientesController} = require("../controllers/clienteController");

//get /clientes listar todos clientes 
router.get('/clientes', clientesController.listarClientes);

//POST /clientes -> criar um novo cliente 
router.post('/clientes', clientesController.criarClientes);

module.exports = {clientesRouter: router};