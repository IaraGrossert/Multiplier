import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Estoque } from '../../Database/Models/estoque.entity';
import { ESTOQUE_REPOSITORY } from 'src/Constants';
import { EstoqueDto } from 'src/Module/Estoque/dto/estoque.dto';

@Injectable()
export class EstoqueService {
    
    constructor(@Inject(ESTOQUE_REPOSITORY) private readonly estoqueRepository: typeof Estoque) { };

    async insertStock(estoque: EstoqueDto): Promise<Estoque>{
        return await this.estoqueRepository.create<Estoque>(estoque);
    }

    async getSingleStock(id: number): Promise<Estoque>{
        return await this.estoqueRepository.findOne<Estoque>({ where: { id } });
    }

    async getAllStock(): Promise<Estoque[]>{
        return await this.estoqueRepository.findAll<Estoque>();
    }
    
    async updateStock(id: number, codigo: string, titulo: string, status: number){
        
        const updatedEstoque = await this.estoqueRepository.findOne<Estoque>({ where: { id } });

        if(!updatedEstoque)
            throw new NotFoundException('Estoque não encontrado');
        
        if(codigo){
            //updatedEstoque.codigo = codigo;
        }
        if(titulo){
            //updatedEstoque.titulo = titulo;
        }
        if(status != null || status != undefined){
            updatedEstoque.status = status;
        }
        
        return await updatedEstoque.save();
    }

    async deleteStock(id: number){
        const estoque = await this.estoqueRepository.findOne<Estoque>({ where: { id } });

        if(!estoque)
            throw new NotFoundException('Estoque não encontrado');
        
        return await estoque.destroy();
    }
}