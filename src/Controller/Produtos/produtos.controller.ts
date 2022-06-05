import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProdutosService } from 'src/Service/Produtos/produtos.service';

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}
    
    @Get()
    getAllProdutos(){
        return this.produtosService.getAllProducts();
    }

    @Get(':id')
    getProdutos(@Param('id') id: number){
        return this.produtosService.getSingleProduct(id);
    }

    @Post()
    addProdutos(
        @Body('codigo') prodCodigo: string, 
        @Body('titulo') prodTitulo: string, 
        @Body('status') prodStatus: number
    ): any {
        return null;/*this.produtosService.insertProduct(
            {codigo: prodCodigo,
            titulo: prodTitulo,
            status: prodStatus} as Produtos);*/
    }

    @Patch(':id')
    updateProdutos(
        @Param('id') id: number,
        @Body('codigo') prodCodigo: string,
        @Body('titulo') prodTitulo: string,
        @Body('status') prodStatus: number
        ){

        return this.produtosService.updateProduct(id, prodCodigo, prodTitulo, prodStatus);
    }

    @Delete(':id')
    deleteProdutos(@Param('id') id: number){
        return this.produtosService.deleteProduct(id); 
    }

}