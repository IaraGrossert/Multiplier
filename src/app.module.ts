import { Module } from '@nestjs/common';
import { CategoriasModule } from './Module/categorias.module';

@Module({
  imports: [CategoriasModule],
})
export class AppModule {}
