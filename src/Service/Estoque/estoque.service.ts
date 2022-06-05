import { Injectable, NotFoundException, Inject, NotImplementedException } from '@nestjs/common';
import { Estoque } from '../../Database/Models/estoque.entity';
import { ESTOQUE_REPOSITORY } from 'src/Constants';
import { EstoqueDto } from 'src/Module/Estoque/dto/estoque.dto';

@Injectable()
export class EstoqueService {
    
    constructor(@Inject(ESTOQUE_REPOSITORY) private readonly estoqueRepository: typeof Estoque) { };

    async getSingleStock(id: number): Promise<Estoque>{
        return await this.estoqueRepository.findOne<Estoque>({ where: { idProduto: id } });
    }
    
    async updateStock(idProduto: number, quantidade: number, reserva: number, status: number){

        const updatedEstoque = await this.estoqueRepository.findOne<Estoque>({ where: { idProduto: idProduto } });
        console.log(updatedEstoque);

        if(!updatedEstoque)
            throw new NotFoundException('Estoque não encontrado');
        
        if(quantidade)
            updatedEstoque.quantidade = quantidade;
        
        if(reserva)
            updatedEstoque.reserva = reserva;
        
        if(status != null || status != undefined)
            updatedEstoque.status = status;
        
        return await updatedEstoque.save();
    }

    async deleteStock(){
        throw new NotImplementedException('Não se pode deletar um estoque.');
    }
}