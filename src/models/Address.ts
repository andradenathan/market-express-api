import { Table, Model, Column, ForeignKey, DataType, AllowNull, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table
export class Address extends Model {
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({type: DataType.BIGINT})
    userId!: number;
    
    @AllowNull(false)
    @Column({type: DataType.STRING})
    street!: string;
    
    @AllowNull(false)
    @Column({type: DataType.STRING})
    city!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    district!: string;

    @BelongsTo(() => User)
    user!: User;
}
