import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IntegerDataType } from 'sequelize/types';

@Table
export class Categorias extends Model<Categorias> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: string;

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
}