import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class User extends Model {

    @Column({type: DataType.STRING})
    name!: string;

    @Column({type: DataType.STRING})
    password!: string;

    @Column({type: DataType.STRING})
    email!: string;

    @HasMany(() => Product)
    products!: Product[];
}

