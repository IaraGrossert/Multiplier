import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../Constants';
import { databaseConfig } from './database.config';
import { Categorias } from './Models/categorias.entity';
import { Estoque } from './Models/estoque.entity';
import { Produtos } from './Models/produtos.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }

        const sequelize = new Sequelize(config);
        sequelize.addModels([Categorias, Produtos, Estoque]);
        await sequelize.sync();
        return sequelize;
    },
}];