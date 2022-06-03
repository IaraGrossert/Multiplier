import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DeletedAt } from 'sequelize-typescript';
import { CategoriasService } from 'src/Service/categorias.service';

@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}
    @Post()
    addCategoria(
        @Body('codigo') catCodigo: string, 
        @Body('titulo') catTitulo: string, 
        @Body('status') catStatus: number
    ): any {
        const generatedId = this.categoriasService.insertCategoria(
            catCodigo,
            catTitulo,
            catStatus);
        return {id: generatedId};
    }

    @Get()
    getAllCategorias(){
        return this.categoriasService.getAllCategorias();
    }

    @Get(':id')
    getCategoria(@Param('id') catId: string){
        return this.categoriasService.getSingleCategoria(catId);
    }

    @Patch(':id')
    updateCategorias(
        @Param('id') catId: string,
        @Body('codigo') catCodigo: string,
        @Body('titulo') catTitulo: string,
        @Body('status') catStatus: number
        ){
        this.categoriasService.updateCategoria(catId, catCodigo, catTitulo, catStatus);
        return null;
    }

    @Delete(':id')
    deleteCategoria(@Param('id') catId: string){
        this.categoriasService.deleteCategoria(catId); 
        return null;
    }

} 