import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from '../Model/categoria.model';

@Injectable()
export class CategoriasService {
    private categorias: Categoria[] = [];

    insertCategoria(codigo: string, titulo: string, status: number) : string{
        const catId = new Date().toString();
        const newCategoria = new Categoria(catId, codigo, titulo, status);
        this.categorias.push(newCategoria);
        return catId;
    }

    getAllCategorias(){
        return [...this.categorias];    
    }

    getSingleCategoria(catId: string){
        const categoria = this.findCategoria(catId)[0];
        return {...categoria};    
    }

    updateCategoria(catId: string, codigo: string, titulo: string, status: number){
        const [categoria, index] = this.findCategoria(catId);
        const updatedCategoria = {...categoria};

        if(codigo){
            updatedCategoria.codigo = codigo;
        }
        if(titulo){
            updatedCategoria.titulo = titulo;
        }
        if(status){
            updatedCategoria.status = status;
        }

        this.categorias[index] = updatedCategoria;
    }

    private findCategoria(catId: string): [Categoria, number]{
        const categoriaIndex = this.categorias.findIndex((cat) => cat.id === catId);
        const categoria = this.categorias[categoriaIndex];
        if(!categoria){
            throw new NotFoundException('Categoria não encontrada');
        }
        return [categoria, categoriaIndex];
    }

    deleteCategoria(catId: string){
        const index = this.findCategoria(catId)[1];
        this.categorias.splice(index, 1);
    }
}