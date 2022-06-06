const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PostgreSQLMultiplier', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
    freezeTableName: true
  },
  dialectOptions: {
      decimalNumbers: true
  }
});

module.exports = sequelize;
