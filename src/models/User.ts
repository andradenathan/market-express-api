import { Column, DataType, Table, Model, HasMany, BelongsToMany, AllowNull } from 'sequelize-typescript';
import { Offer } from './Offer';
import { Product } from './Product';

@Table
export class User extends Model {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    password!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    email!: string;

    @HasMany(() => Product)
    products!: Product[];

    @BelongsToMany(() => Product, () => Offer)
    offers!: Product[];
}

