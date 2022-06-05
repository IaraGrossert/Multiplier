import { Module } from "@nestjs/common";
import { ProdutosController } from "src/Controller/Produtos/produtos.controller";
import { ProdutosService } from "src/Service/Produtos/produtos.service";
import { ProdutosProviders } from "./produtos.providers";

@Module({
    imports: [ProdutosModule],
    controllers: [ProdutosController],
    providers: [ProdutosService, ...ProdutosProviders]
})
export class ProdutosModule {}