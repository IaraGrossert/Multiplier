import { Injectable, NotFoundException, Inject, NotImplementedException } from '@nestjs/common';
import { Estoque } from '../../Database/Models/estoque.entity';
import { ESTOQUE_REPOSITORY, MESSAGE_NOT_IMPLEMENTED_EXCEPTION_STOCK, MESSAGE_PRODUCT_NOT_FOUND } from 'src/Constants';
import { EstoqueDto } from 'src/Module/Estoque/dto/estoque.dto';

@Injectable()
export class EstoqueService {
    
    constructor(@Inject(ESTOQUE_REPOSITORY) private readonly estoqueRepository: typeof Estoque) { };

    async getSingleStock(id: number): Promise<Estoque>{
        const result = await this.estoqueRepository.findOne<Estoque>({ where: { idProduto: id } });

        if(!result)
            throw new NotFoundException(MESSAGE_PRODUCT_NOT_FOUND);

        return result;
    }
    
    async updateStock(idProduto: number, quantidade: number, reserva: number, status: number){
        const updatedEstoque = await this.estoqueRepository.findOne<Estoque>({ where: { idProduto: idProduto } });

        if(!updatedEstoque)
            throw new NotFoundException(MESSAGE_PRODUCT_NOT_FOUND);
        
        if(quantidade)
            updatedEstoque.quantidade = quantidade;
        
        if(reserva)
            updatedEstoque.reserva = reserva;
        
        if(status != null || status != undefined)
            updatedEstoque.status = status;
        
        return await updatedEstoque.save();
    }

    async deleteStock(){
        throw new NotImplementedException(MESSAGE_NOT_IMPLEMENTED_EXCEPTION_STOCK);
    }
}