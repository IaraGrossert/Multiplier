import { Module } from "@nestjs/common";
import { CategoriasController } from "src/Controller/Categorias/categorias.controller";
import { CategoriasService } from "src/Service/Categorias/categorias.service";
import { CategoriasProviders } from "./categorias.providers";

@Module({
    imports: [CategoriasModule],
    controllers: [CategoriasController],
    providers: [CategoriasService, ...CategoriasProviders]
})
export class CategoriasModule {}