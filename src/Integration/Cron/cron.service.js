const schedule = require('node-schedule');
const axios = require('axios');
const provider = require('../Database/postgresDatabase.provider');
const categorias = require('../Database/Entities/categorias.entity');
const produtos = require('../Database/Entities/produtos.entity');
const estoque = require('../Database/Entities/estoque.entity');

const getAll = async () => {
    try {
        const stock = [];
        const categories = (await axios.get('http://localhost:3000/categorias')).data;
        const products = (await axios.get('http://localhost:3000/produtos')).data;  

        for (const prod of products) {
            const estoque = (await axios.get(`http://localhost:3000/produtos/${prod.id}/estoque`)).data;
            stock.push(estoque);
        }

        return [categories, products, stock];

    } catch (error) {
        console.error(error)
    }
}

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

schedule.scheduleJob('0 */1 * * *', async () => {
    provider.sync();
    const [categories, products, stock] = await getAll();
    
    const t = await provider.transaction();
    
    await deleteAll(t);
    await createAll(categories, products, stock, t);
    
    await t.commit();
});