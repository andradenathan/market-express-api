import { Table, Model, Column, ForeignKey, DataType, AllowNull } from "sequelize-typescript";
import { Product } from "./Product";
import { User } from "./User";

@Table
export class Offer extends Model {

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({type: DataType.BIGINT})
    userId!: number;

    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column({type: DataType.BIGINT})
    productId!: number;

    @AllowNull(false)
    @Column({type: DataType.FLOAT})
    value!: number;
}