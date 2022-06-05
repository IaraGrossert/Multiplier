import { Module } from "@nestjs/common";
import { EstoqueController } from "src/Controller/Estoque/estoque.controller";
import { EstoqueService } from "src/Service/Estoque/estoque.service";
import { EstoqueProviders } from "./estoque.providers";

@Module({
    imports: [EstoqueModule],
    controllers: [EstoqueController],
    providers: [EstoqueService, ...EstoqueProviders]
})
export class EstoqueModule {}