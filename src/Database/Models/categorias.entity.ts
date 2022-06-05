import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Produtos } from './produtos.entity';

@Table
export class Categorias extends Model<Categorias> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    codigo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    titulo: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
        
    })
    status: number;

    @HasMany(() => Produtos, {onDelete: 'SET NULL'})
    produtos: Produtos[]
}