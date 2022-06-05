import { Controller, Post, Body, Get, Param, Patch, Delete, NotImplementedException } from '@nestjs/common'; 
import { EstoqueService } from 'src/Service/Estoque/estoque.service';

@Controller('produtos/:id/estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}

    @Get()
    getEstoque(@Param('id') id: number){
        return this.estoqueService.getSingleStock(id);
    }

    @Patch()
    updateEstoque(
        @Param('id') idProduto: number,
        @Body('quantidade') estQuantidade: number,
        @Body('reserva') estReserva: number,
        @Body('status') estStatus: number
        ){
        return this.estoqueService.updateStock(idProduto, estQuantidade, estReserva, estStatus);
    }

    @Delete()
    deleteEstoque(@Param('id') id: number){
        return this.estoqueService.deleteStock();
    }

}