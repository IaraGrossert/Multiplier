const Sequelize = require('sequelize');
const database = require('../postgreSQL.provider');
const Estoque = require('./estoque.entity');
 
const Produto = database.define('Produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idCategoria: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },

    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },

    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Produto.hasOne(Estoque, {
    foreignKey: 'idProduto',
    onDelete: 'CASCADE'
})

module.exports = Produto;