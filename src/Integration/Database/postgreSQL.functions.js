const categorias = require('../Database/Entities/categorias.entity');
const produtos = require('../Database/Entities/produtos.entity');
const estoque = require('../Database/Entities/estoque.entity');

const createAll = async (categories, products, stock, t) => {
    try{
        await categorias.bulkCreate(categories, {transaction: t});
        await produtos.bulkCreate(products, {transaction: t});
        await estoque.bulkCreate(stock, {transaction: t});
    } catch(error){
        console.error(error);
        await t.rollback(); 
    }
}    
        
const deleteAll = async (t) => {    
    try{
        await categorias.destroy({ where: {} }, {transaction: t});
        await produtos.destroy({ where: {} }, {transaction: t});
    } catch(error){
        console.error(error);
        await t.rollback(); 
    }
}

module.exports = {createAll, deleteAll};
    