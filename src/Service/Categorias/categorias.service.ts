import { Injectable, NotFoundException, Inject, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CategoriaDto } from '../../Module/Categorias/dto/categorias.dto';
import { Categorias } from '../../Database/Models/categorias.entity';
import { CATEGORIA_REPOSITORY, SEQUELIZE_VALIDATION_ERROR, MESSAGE_SEQUELIZE_VALIDATION_ERROR, MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_CATEGORY_NOT_FOUND } from 'src/Constants';

@Injectable()
export class CategoriasService {
    
    constructor(@Inject(CATEGORIA_REPOSITORY) private readonly categoriaRepository: typeof Categorias) { };

    async insertCategory(categoria: CategoriaDto): Promise<Categorias>{
            try {
                return await this.categoriaRepository.create<Categorias>(categoria);
            } catch (error) {
                const message = error.message;

                if (message === SEQUELIZE_VALIDATION_ERROR)
                    throw new ConflictException(MESSAGE_SEQUELIZE_VALIDATION_ERROR);

                throw new InternalServerErrorException(MESSAGE_INTERNAL_SERVER_ERROR);
            }
    }

    async getSingleCategory(id: number): Promise<Categorias>{
        const result = await this.categoriaRepository.findOne<Categorias>({ where: { id } });

        if(!result)
            throw new NotFoundException(MESSAGE_CATEGORY_NOT_FOUND);

        return result;
    }

    async getAllCategories(): Promise<Categorias[]>{
        return await this.categoriaRepository.findAll<Categorias>();
    }
    
    async updateCategory(id: number, codigo: string, titulo: string, status: number){        
        const updatedCategoria = await this.categoriaRepository.findOne<Categorias>({ where: { id } });

        if(!updatedCategoria)
            throw new NotFoundException(MESSAGE_CATEGORY_NOT_FOUND);
        
        if(codigo){
            updatedCategoria.codigo = codigo;
        }
        if(titulo){
            updatedCategoria.titulo = titulo;
        }
        if(status != null || status != undefined){
            updatedCategoria.status = status;
        }

        try {
            return await updatedCategoria.save();
        } catch (error) {
            const message = error.message;

            if (message === SEQUELIZE_VALIDATION_ERROR)
                throw new ConflictException(MESSAGE_SEQUELIZE_VALIDATION_ERROR);

            throw new InternalServerErrorException(MESSAGE_INTERNAL_SERVER_ERROR);
        }
        
        
    }

    async deleteCategory(id: number){
        const categoria = await this.categoriaRepository.findOne<Categorias>({ where: { id } });

        if(!categoria)
            throw new NotFoundException(MESSAGE_CATEGORY_NOT_FOUND);
        
        return await categoria.destroy();
    }
}