import { Produtos } from '../../Database/Models/produtos.entity';
import { PRODUTOS_REPOSITORY } from '../../Constants';

export const ProdutosProviders = [{
    provide: PRODUTOS_REPOSITORY,
    useValue: Produtos,
}];