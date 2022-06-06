const schedule = require('node-schedule');
const provider = require('../Database/postgreSQL.provider');
const functions = require('../Database/postgreSQL.functions');
const apiRequest = require('../API/requests');

schedule.scheduleJob('0 */2 * * *', async () => {
    provider.sync();
    const [categories, products, stock] = await apiRequest.getAll();
    
    const t = await provider.transaction();
    
    await functions.deleteAll(t);
    await functions.createAll(categories, products, stock, t);
    
    await t.commit();
});