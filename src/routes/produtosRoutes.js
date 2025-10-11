const express = require("express");
const router = express.Router();
const {produtosController} = require("../controllers/produtoController");

//get /produtos listar todos os produtos.
router.get('/produtos', produtosController.listarProdutos);

module.exports = {produtoRoutes: router};