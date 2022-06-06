const Sequelize = require('sequelize');
const database = require('../postgreSQL.provider');

const Estoque = database.define('Estoque', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idProduto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    reserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Estoque;