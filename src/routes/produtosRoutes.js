const express = require("express");
const router = express.Router();
const {produtosController} = require("../controllers/produtoController");

//get /produtos listar todos os produtos.
router.get('/produtos', produtosController.listarProdutos);

// POST /produtos -> Criar um novo produto
router.post('/produtos', produtosController.criarProduto);

// PUT /produto/:idProduto -> atualizar um produto existente
router.put('/produtos/:idProduto', produtosController.atualizarProduto);

// DELETE /produto/:idProduto ->deletar um produto existente
router.delete('/produtos/:idProduto', produtosController.deletarProduto);

module.exports = {produtoRoutes: router};