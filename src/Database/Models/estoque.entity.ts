import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Produtos } from './produtos.entity';

@Table
export class Estoque extends Model<Estoque> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => Produtos)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    idProduto: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantidade: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
        
    })
    reserva: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
        
    })
    status: number;

    @BelongsTo(() => Produtos)
    produto: Produtos
}