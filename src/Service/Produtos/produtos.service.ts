import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Produtos } from '../../Database/Models/produtos.entity';
import { PRODUTOS_REPOSITORY } from 'src/Constants';
import { ProdutosDto } from 'src/Module/Produtos/dto/produtos.dto';

@Injectable()
export class ProdutosService {
    
    constructor(@Inject(PRODUTOS_REPOSITORY) private readonly produtoRepository: typeof Produtos) { };

    async insertProduct(produto: ProdutosDto): Promise<Produtos>{
        return await this.produtoRepository.create<Produtos>(produto);
    }

    async getSingleProduct(id: number): Promise<Produtos>{
        return await this.produtoRepository.findOne<Produtos>({ where: { id } });
    }

    async getAllProducts(): Promise<Produtos[]>{
        return await this.produtoRepository.findAll<Produtos>();
    }
    
    async updateProduct(id: number, idCategoria: number, codigo: string, nome: string, descricao: string, valor: number, status: number){
        const updatedProdutos = await this.produtoRepository.findOne<Produtos>({ where: { id } });

        if(!updatedProdutos)
            throw new NotFoundException('Produto não encontrado');
        
        if(idCategoria)
            updatedProdutos.idCategoria = idCategoria;

        if(codigo)
            updatedProdutos.codigo = codigo;

        if(nome)
            updatedProdutos.nome = nome;
        
        if(descricao)
            updatedProdutos.descricao = descricao;

        if(valor)
            updatedProdutos.valor = valor;
        
        if(status != null || status != undefined){
            updatedProdutos.status = status;
        }
        
        return await updatedProdutos.save();
    }

    async deleteProduct(id: number){
        const produto = await this.produtoRepository.findOne<Produtos>({ where: { id } });

        if(!produto)
            throw new NotFoundException('Produto não encontrado');
        
        return await produto.destroy();
    }
}