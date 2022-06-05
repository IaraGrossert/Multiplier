import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CategoriaDto } from '../../Module/Categorias/dto/categorias.dto';
import { Categorias } from '../../Database/Models/categorias.entity';
import { CATEGORIA_REPOSITORY } from 'src/Constants';

@Injectable()
export class CategoriasService {
    
    constructor(@Inject(CATEGORIA_REPOSITORY) private readonly categoriaRepository: typeof Categorias) { };

    async insertCategory(categoria: CategoriaDto): Promise<Categorias>{
        return await this.categoriaRepository.create<Categorias>(categoria);
    }

    async getSingleCategory(id: number): Promise<Categorias>{
        return await this.categoriaRepository.findOne<Categorias>({ where: { id } });
    }

    async getAllCategories(): Promise<Categorias[]>{
        return await this.categoriaRepository.findAll<Categorias>();
    }
    
    async updateCategory(id: number, codigo: string, titulo: string, status: number){
        
        const updatedCategoria = await this.categoriaRepository.findOne<Categorias>({ where: { id } });

        if(!updatedCategoria)
            throw new NotFoundException('Categoria não encontrada');
        
        if(codigo){
            updatedCategoria.codigo = codigo;
        }
        if(titulo){
            updatedCategoria.titulo = titulo;
        }
        if(status != null || status != undefined){
            updatedCategoria.status = status;
        }
        
        return await updatedCategoria.save();
    }

    async deleteCategory(id: number){
        const categoria = await this.categoriaRepository.findOne<Categorias>({ where: { id } });

        if(!categoria)
            throw new NotFoundException('Categoria não encontrada');
        
        return await categoria.destroy();
    }
}