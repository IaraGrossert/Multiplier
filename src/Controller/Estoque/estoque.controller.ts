import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Estoque } from 'src/database/Models/estoque.entity';
import { EstoqueService } from 'src/Service/Estoque/estoque.service';

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}
    
    @Get()
    getAllEstoque(){
        return this.estoqueService.getAllStock();
    }

    @Get(':id')
    getEstoque(@Param('id') id: number){
        return this.estoqueService.getSingleStock(id);
    }

    @Post()
    addEstoque(
        @Body('codigo') estCodigo: string, 
        @Body('titulo') estTitulo: string, 
        @Body('status') estStatus: number
    ): any {
        return null; /*this.estoqueService.insertStock(
            {codigo: estCodigo,
            titulo: estTitulo,
            status: estStatus} as Estoque);*/
    }

    @Patch(':id')
    updateEstoque(
        @Param('id') id: number,
        @Body('codigo') estCodigo: string,
        @Body('titulo') estTitulo: string,
        @Body('status') estStatus: number
        ){

        return this.estoqueService.updateStock(id, estCodigo, estTitulo, estStatus);
    }

    @Delete(':id')
    deleteEstoque(@Param('id') id: number){
        return this.estoqueService.deleteStock(id); 
    }

}