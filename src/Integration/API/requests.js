const axios = require('axios');

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

module.exports = {getAll};