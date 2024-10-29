const dao = require("../dao/conn");
const mongoose = dao.conn;

const ipSchema = new mongoose.Schema({
    block1: {
        type: Number,
        min: 0,
        max: 255
    },
    block2: {
        type: Number,
        min: 0,
        max: 255
    },
    block3:{
        type: Number,
        min: 0,
        max: 255
    },
    block4:{
        type: Number,
        min: 0,
        max: 255
    },
})

const dbSchema = new mongoose.Schema({
    name: String,
    dbname: String, // nome do banco de dados do mongo. Ex.: hospBahiaDB, hospPortuguesDB, hospAliancaDB...
    dbroute: String, // url da rota no navegador. Ex.: www.signus.com.br/hospitalbahia, www.signus.com.br/hospportugues...
    IPStart: {ipSchema},
    IPEnd: {ipSchema}, //faixa de IPs permissiveis a acessar a rota de UNIDADES (UTI) de cada DB
});

const Database = new mongoose.model("Database", dbSchema);

module.exports = Database;