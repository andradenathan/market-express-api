import { Column, DataType, Table, Model, HasMany, BelongsToMany, AllowNull, HasOne, Unique,  } from 'sequelize-typescript';
import { Address } from './Address';
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
    @Unique
    @Column({type: DataType.STRING})
    email!: string;

    @HasMany(() => Product)
    products!: Product[];

    @BelongsToMany(() => Product, () => Offer)
    offers!: Product[];

    @HasOne(() => Address)
    address!: Address;
}

