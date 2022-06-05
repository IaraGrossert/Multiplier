import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { CategoriasModule } from './Module/Categorias/categorias.module';
//import { EstoqueModule } from './Module/Estoque/estoque.module';
import { ProdutosModule } from './Module/Produtos/produtos.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, CategoriasModule, ProdutosModule, /*EstoqueModule*/]
})

export class AppModule {}
