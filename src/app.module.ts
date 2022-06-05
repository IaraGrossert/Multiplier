import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { CategoriasModule } from './Module/Categorias/categorias.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule, CategoriasModule]
})

export class AppModule {}
