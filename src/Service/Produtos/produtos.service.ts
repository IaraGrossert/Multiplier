import { Injectable, NotFoundException, Inject, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Produtos } from '../../Database/Models/produtos.entity';
import { DB_ERROR_CATEGORY_NOT_FOUND, MESSAGE_CATEGORY_NOT_FOUND, MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_PRODUCT_NOT_FOUND, MESSAGE_SEQUELIZE_VALIDATION_ERROR, PRODUTOS_REPOSITORY, SEQUELIZE_VALIDATION_ERROR } from 'src/Constants';
import { ProdutosDto } from 'src/Module/Produtos/dto/produtos.dto';

@Injectable()
export class ProdutosService {
    
    constructor(@Inject(PRODUTOS_REPOSITORY) private readonly produtoRepository: typeof Produtos) { };

    async insertProduct(produto: ProdutosDto): Promise<Produtos>{
        try{
            return await this.produtoRepository.create<Produtos>(produto);
        }
        catch (error) {
            const message = error.message;

            if (message === SEQUELIZE_VALIDATION_ERROR)
                throw new ConflictException(MESSAGE_SEQUELIZE_VALIDATION_ERROR);

            if (message === DB_ERROR_CATEGORY_NOT_FOUND)
                throw new NotFoundException(MESSAGE_CATEGORY_NOT_FOUND);

            throw new InternalServerErrorException(MESSAGE_INTERNAL_SERVER_ERROR);
        }
    }

    async getSingleProduct(id: number): Promise<Produtos>{
        const result = await this.produtoRepository.findOne<Produtos>({ where: { id } });

        if(!result)
            throw new NotFoundException(MESSAGE_PRODUCT_NOT_FOUND);

        return result;
    }

    async getAllProducts(): Promise<Produtos[]>{
        return await this.produtoRepository.findAll<Produtos>();
    }
    
    async updateProduct(id: number, idCategoria: number, codigo: string, nome: string, descricao: string, valor: number, status: number){
        const updatedProdutos = await this.produtoRepository.findOne<Produtos>({ where: { id } });

        if(!updatedProdutos)
            throw new NotFoundException(MESSAGE_PRODUCT_NOT_FOUND);
        
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
        
        try{
            return await updatedProdutos.save();
        }
        catch (error) {
            const message = error.message;

            if (message === SEQUELIZE_VALIDATION_ERROR)
                throw new ConflictException(MESSAGE_SEQUELIZE_VALIDATION_ERROR);

            if (message === DB_ERROR_CATEGORY_NOT_FOUND)
                throw new NotFoundException(MESSAGE_CATEGORY_NOT_FOUND);

            throw new InternalServerErrorException(MESSAGE_INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(id: number){
        const produto = await this.produtoRepository.findOne<Produtos>({ where: { id } });

        if(!produto)
            throw new NotFoundException(MESSAGE_PRODUCT_NOT_FOUND);
        
        return await produto.destroy();
    }
}