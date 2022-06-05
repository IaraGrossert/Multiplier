import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Produtos } from 'src/Database/Models/produtos.entity';
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
        @Body('idCategoria') idCategoria: number, 
        @Body('codigo') prodCodigo: string, 
        @Body('nome') prodNome: string,
        @Body('descricao') prodDescricao: string,
        @Body('valor') prodValor: number,
        @Body('status') prodStatus: number
    ): any {
        return this.produtosService.insertProduct(
            {idCategoria: idCategoria,
                codigo: prodCodigo,
                nome: prodNome,
                descricao: prodDescricao,
                valor: prodValor,
                status: prodStatus } as Produtos);
    }

    @Patch(':id')
    updateProdutos(
        @Param('id') id: number,
        @Body('idCategoria') idCategoria: number, 
        @Body('codigo') prodCodigo: string, 
        @Body('nome') prodNome: string,
        @Body('descricao') prodDescricao: string,
        @Body('valor') prodValor: number,
        @Body('status') prodStatus: number
        ){

        return this.produtosService.updateProduct(id, idCategoria, prodCodigo, prodNome, prodDescricao, prodValor, prodStatus);
    }

    @Delete(':id')
    deleteProdutos(@Param('id') id: number){
        return this.produtosService.deleteProduct(id); 
    }

}