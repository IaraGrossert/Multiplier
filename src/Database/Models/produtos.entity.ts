import { Table, Column, Model, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import { Categorias } from './categorias.entity';
import { Estoque } from './estoque.entity';

@Table
export class Produtos extends Model<Produtos> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => Categorias)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    idCategoria: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    codigo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nome: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    descricao: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false
    })
    valor: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
        
    })
    status: number;

    @HasOne(() => Estoque, {onDelete: 'CASCADE'})
    estoque = Estoque;
}