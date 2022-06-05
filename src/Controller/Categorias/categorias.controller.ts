import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Categorias } from 'src/database/Models/categorias.entity';
import { CategoriasService } from 'src/Service/Categorias/categorias.service';

@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}
    
    @Get()
    getAllCategorias(){
        return this.categoriasService.getAllCategories();
    }

    @Get(':id')
    getCategoria(@Param('id') catId: number){
        return this.categoriasService.getSingleCategory(catId);
    }

    @Post()
    addCategoria(
        @Body('codigo') catCodigo: string, 
        @Body('titulo') catTitulo: string, 
        @Body('status') catStatus: number
    ): any {
        return this.categoriasService.insertCategory(
            {codigo: catCodigo,
            titulo: catTitulo,
            status: catStatus} as Categorias);
    }

    @Patch(':id')
    updateCategorias(
        @Param('id') catId: number,
        @Body('codigo') catCodigo: string,
        @Body('titulo') catTitulo: string,
        @Body('status') catStatus: number
        ){

        return this.categoriasService.updateCategory(catId, catCodigo, catTitulo, catStatus);
    }

    @Delete(':id')
    deleteCategoria(@Param('id') id: number){
        return this.categoriasService.deleteCategory(id); 
    }

}