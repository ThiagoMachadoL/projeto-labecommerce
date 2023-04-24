# Projeto labecommerce

É o primeiro projeto do back-end, onde praticamos toda a base de criação de uma API vinculada a um banco de dados real.<br>


## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

# Banco de dados
![image](https://user-images.githubusercontent.com/29845719/214396608-ddcfd097-e615-44f9-acbe-f815f9abb83f.png)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666

# Lista de requisitos

- Documentação Postman de todos os endpoints (obrigatória para correção)

- Endpoints

    - [ ]  Get all users
    - [ ]  Create user
    - [ ]  Create product
    - [ ]  Get all products funcionalidade 1
    - [ ]  Get all products funcionalidade 2
    - [ ]  Edit product by id
    - [ ]  Create purchase
    - [ ]  Delete purchase by id
    - [ ]  Get purchase by id

- README.md

# Exemplos de requisição
Não precisa cadastrar o mesmo nome, email e quaisquer outros valores vistos aqui nos exemplos de saída. Porém, lembre-se de respeitar a estrutura pedida no banco de dados (nome das tabelas e colunas) e os nomes das propriedades na resposta da API.

Colunas a mais na tabela não tem problema, por exemplo adicionar uma 'category' dentro da tabela 'products', mas a falta de uma coluna ou propriedade na resposta será considerada falha de implementação!

## Get all users
Retorna todas as pessoas cadastradas.<br>
Dica: atenção com o nome da propriedade createdAt! Ela deve vir em camelCase, apesar de estar em snake_case no banco de dados.
```typescript
// Request
// GET /users

// Response
// status 200 OK
[
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42"
    },
    {
        id: "u002",
        name: "Ciclana",
        email: "ciclana@email.com",
        password: "ciclana99",
        createdAt: "2023-01-17 12:35:28"
    }
]
```

## Create user
Cadastra uma nova pessoa.
```typescript
// Request
// POST /users
// body JSON
{
    "id":"12",
    "name":"Gil",
    "email":"gil@email.com",
    "password":"labenu123"
}

// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso"
}
```

## Create product
Cadastra um novo produto.
```typescript
// Request
// POST /products
// body JSON
{
    "id": "123",
    "name": "Caixa bag",
    "price": 20,
    "category": "duplex",
    "imageUrl": "img11"
}

// Response
// status 201 CREATED
{
    message: "Produto cadastrado com sucesso"
}
```

## Get all products funcionalidade 1
Retorna todos os produtos cadastrados.
```typescript
// Request
// GET /products

// Response
// status 200 OK
[
  {
    "id": "011",
    "name": "Caixa de doce",
    "price": 50,
    "category": "Kraft",
    "image_url": "img0"
  },
  {
    "id": "022",
    "name": "Caixa de mudança",
    "price": 22,
    "category": "Microondulado",
    "image_url": "img1"
  },
  {
    "id": "033",
    "name": "Caixa c/ visor 10 x 20",
    "price": 5,
    "category": "Duplex",
    "image_url": "img2"
  },
  {
    "id": "044",
    "name": "Sacola",
    "price": 2,
    "category": "Kraft",
    "image_url": "img3"
  },
  {
    "id": "055",
    "name": "Caixa c/ visor 25 x 35",
    "price": 12,
    "category": "Kraft",
    "image_url": "img4"
  },
  {
    "id": "066",
    "name": "Caixa estampada 20 x 30",
    "price": 10,
    "category": "Duplex",
    "image_url": "img5"
  },
  {
    "id": "077",
    "name": "Caixa p/ ovo de colher 350g",
    "price": 4,
    "category": "Kraft",
    "image_url": "img6"
  },
  {
    "id": "088",
    "name": "Caixa p/ tranporte (Correios) 30 x 20 x 10",
    "price": 8,
    "category": "Microondulado",
    "image_url": "img7"
  },
  {
    "id": "099",
    "name": "Caixa box 20 x 20 x 10",
    "price": 12,
    "category": "Kraft",
    "image_url": "img8"
  },
  {
    "id": "100",
    "name": "Caixa surpresa 27 x 27",
    "price": 20,
    "category": "Cartonada",
    "image_url": "img9"
  },
  {
    "id": "123",
    "name": "Caixa bag",
    "price": 20,
    "category": "duplex ",
    "image_url": "img11"
  }
]
```

## Get all products funcionalidade 2
Caso seja enviada uma pathparams deve ser retornado o resultado da busca de produtos pelo id.
```typescript
// Request
// path params = :id
// GET /products/077

// Response
// status 200 OK
[
    {
    "id": "077",
    "name": "Caixa p/ ovo de colher 350g",
    "price": 4,
    "category": "Kraft",
    "image_url": "img6"
    }
]
```

## Edit product by id
Edita um produto existente.
```typescript
// Request
// path params = :id

// PUT /products/prod003
// body JSON
{
        "id": "099",
        "name": "Caixa box 20 x 20 x 10",
        "price": 12,
        "category": "Kraft",
        "image_url": "img8"
}'

// Response
// status 200 OK
{
  "message": " Produto alterado com sucesso",
  "user": {
    "id": "099",
    "name": "Caixa box 20 x 20 x 10",
    "price": 12,
    "category": "Kraft"
  }
}
```

## Create purchase
Cadastra um novo pedido. 
// Request
// POST /purchases
// body JSON
 {
        "id": "c001",
        "buyer_id": "05",
        "total_price": 15,
        "paid": 2
}'

// Response
// status 201 CREATED
{
  "message": "Compra realizada com sucesso!"
}
```

## Delete purchase by id
Deleta um pedido existente.
```typescript
// Request
// path params = :id
// DELETE /purchases/pur002

// Response
// status 200 OK
{
    message: "Compra deletada com sucesso"
}
```

## Get purchase by id
Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
```typescript
// Request
// path params = :id
// GET /purchases/pur001

// Response
// status 200 OK
{
  "idDaCompra": "c003",
  "valorDaCompra": 50,
  "criadaEm": "2023-04-23 23:39:52",
  "status": 0,
  "idDoComprador": "03",
  "emailComprador": "carol@email.com",
  "nomeDoComprador": "carol",
  "paid": true,
  "productList": [
    {
      "idProduto": "088",
      "nomaProduto": "Caixa p/ tranporte (Correios) 30 x 20 x 10",
      "preçoProduto": 8,
      "category": "Microondulado",
      "image_url": "img7",
      "quantity": 6
    }
  ]
}
```

# Documentação para referência (como deve ficar)
https://documenter.getpostman.com/view/25390008/2s93Y5PKr7
