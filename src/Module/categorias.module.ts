import { Module } from "@nestjs/common";
import { CategoriasController } from "src/Controller/categorias.controller";
import { CategoriasService } from "src/Service/categorias.service";

@Module({
    imports: [CategoriasModule],
    controllers: [CategoriasController],
    providers: [CategoriasService]
})
export class CategoriasModule {}