import { Categorias } from '../../Database/Models/categorias.entity';
import { CATEGORIA_REPOSITORY } from '../../Constants';

export const CategoriasProviders = [{
    provide: CATEGORIA_REPOSITORY,
    useValue: Categorias,
}];