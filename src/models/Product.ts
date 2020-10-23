import { AllowNull, BelongsTo, Column, DataType, Table, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

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

    @BelongsTo(() => User)
    owner!: User;
}