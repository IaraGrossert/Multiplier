import { Estoque } from '../../Database/Models/estoque.entity';
import { ESTOQUE_REPOSITORY } from '../../Constants';

export const EstoqueProviders = [{
    provide: ESTOQUE_REPOSITORY,
    useValue: Estoque,
}];