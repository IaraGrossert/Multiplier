const Sequelize = require('sequelize');
const database = require('../postgreSQL.provider');
const Produto = require('./produtos.entity');

const Categoria = database.define('Categorias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Categoria.hasMany(Produto, {
    foreignKey: 'idCategoria',
    onDelete: 'SET NULL'
});

module.exports = Categoria;