## API Reference 

### Produtos

#### GET/produtos
-**Descrição**:Obtém uma lista de produtos

-**Response**:Array de produtos 

#### POST /produtos
-**Descrição**:Cria um novo produto 
-**Body**:
```

{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
-**Response**:
```
{"message":"Produto cadastrado com sucesso!"
}
```

### Clientes

#### GET /clientes
-**Descrição**:Obtém uma lista de clientes

-**Response**:
```
{
    "message":"Cliente encontrado!"
}
```

-**Error Response**:
```
{
    "message":"Erro ao buscar Cliente"
}
```

-**Descrição**:Inserir clientes no Banco De Dados

-**Response**:
```
{
   "message":"Cliente inserido com sucesso!"   
}
```
-**Error Response**:
```
{
    "message":"Erro ao inserir Cliente"
}
```

-**Body**:
```
{
    "nomeCliente": "clienteExemplo",
    "cpfCliente": 000.000.000-00
}
```