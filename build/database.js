"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embalagens = exports.accounts = void 0;
const types_1 = require("./types");
exports.accounts = [
    {
        id: "a001",
        ownerName: "Ciclano",
        balance: 10000,
        type: types_1.ACCOUNT_TYPE.GOLD
    },
    {
        id: "a002",
        ownerName: "Astrodev",
        balance: 500000,
        type: types_1.ACCOUNT_TYPE.BLACK
    },
    {
        id: "a003",
        ownerName: "Fulana",
        balance: 20000,
        type: types_1.ACCOUNT_TYPE.PLATINUM
    }
];
exports.embalagens = [
    {
        id: "a001",
        modelo: "presente",
        papel: types_1.PAPEL_TYPE.DPX,
        cor: "craft",
        preco: 5.0
    },
    {
        id: "a002",
        modelo: "Caixa para transporte",
        papel: types_1.PAPEL_TYPE.MCO,
        cor: "craft",
        preco: 2.0
    },
    {
        id: "a003",
        modelo: "para doces",
        papel: types_1.PAPEL_TYPE.CTO,
        cor: "estampada",
        preco: 12.0
    }
];
//# sourceMappingURL=database.js.map