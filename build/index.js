"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/accounts", (req, res) => {
    res.send(database_1.accounts);
});
app.get('/accounts/:id', (req, res) => {
    const id = req.params.id;
    const result = database_1.accounts.find((account) => {
        return account.id === id;
    });
    res.status(200).send(result);
});
app.delete('/accounts/:id', (req, res) => {
    const id = req.params.id;
    const indexToRemove = database_1.accounts.findIndex((account) => {
        return account.id === id;
    });
    if (indexToRemove >= 0) {
        database_1.accounts.splice(indexToRemove, 1);
    }
    res.status(200).send("Conta deletada com sucesso");
});
app.put('/accounts/:id', (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newOwnerName = req.body.ownerName;
    const newBalance = req.body.balance;
    const newType = req.body.type;
    const account = database_1.accounts.find((account) => {
        return account.id === id;
    });
    if (account) {
        account.id = newId || account.id;
        account.ownerName = newOwnerName || account.ownerName;
        account.balance = isNaN(newBalance) ? account.balance : newBalance;
        account.type = newType || account.type;
    }
    res.status(200).send("atualização realizada com sucesso");
});
app.post('/products', (req, res) => {
    const id = req.body.id;
    const modelo = req.body.genero;
    const papel = req.body.raca;
    const preco = req.body.name;
    const cor = req.body.cor;
    const newEmbalagens = {
        id,
        modelo,
        papel,
        cor,
        preco
    };
    database_1.embalagens.push(newEmbalagens);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.get("/products", (req, res) => {
    res.send(database_1.embalagens);
});
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newModelo = req.body.modelo;
    const newPreco = req.body.preco;
    const newCor = req.body.cor;
    const embalagem = database_1.embalagens.find((embalagem) => {
        return embalagem.id === id;
    });
    if (embalagem) {
        embalagem.id = newId || embalagem.id;
        embalagem.modelo = newModelo || embalagem.modelo;
        embalagem.preco = newPreco || embalagem.preco;
        embalagem.cor = !isNaN(newCor) ? newCor : embalagem.cor;
    }
    res.status(200).send("Atualização realizada");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const indexToRemove = database_1.embalagens.findIndex((embalagem) => {
        return embalagem.id === id;
    });
    if (indexToRemove >= 0) {
        database_1.embalagens.splice(indexToRemove, 1);
    }
    res.status(200).send("Embalagem deletada com sucesso");
});
//# sourceMappingURL=index.js.map