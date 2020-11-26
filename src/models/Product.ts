import { AllowNull, BelongsTo, Column, DataType, Table, Model, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Offer } from './Offer';
import { User } from './User';

// Model de prduto
@Table
export class Product extends Model {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name!: string;

    @AllowNull(false)
    @Column({type: DataType.FLOAT})
    value!: Number;

    @ForeignKey(() => User)
    @Column({type: DataType.BIGINT})
    ownerId!: number;

    @BelongsTo(() => User, {onDelete: 'CASCADE'})   // Relação de dono
    owner!: User;

    @BelongsToMany(() => User, () => Offer) // Relação de ofertas
    offers!: User[];
}